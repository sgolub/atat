import { MuchResult, MuchResultTypes } from './common';

export function matchRecursive(
  str: string,
  left: RegExp,
  right: RegExp,
): MuchResult[] {
  const global = left.global;
  const sticky = left.sticky;
  const output: MuchResult[] = [];
  let openTokens = 0;
  let delimStart = 0;
  let delimEnd = 0;
  let lastOuterEnd = 0;
  let outerStart: number = 0;
  let innerStart: number = 0;
  let leftMatch: RegExpExecArray | null;
  let rightMatch: RegExpExecArray | null;

  while (true) {
    leftMatch = regexpExec(str, left, delimEnd);
    rightMatch = regexpExec(str, right, delimEnd);

    // Keep the leftmost match only
    if (leftMatch && rightMatch) {
      if (leftMatch.index <= rightMatch.index) {
        rightMatch = null;
      } else {
        leftMatch = null;
      }
    }

    // Paths (LM: leftMatch, RM: rightMatch, OT: openTokens):
    // LM | RM | OT | Result
    // 1  | 0  | 1  | loop
    // 1  | 0  | 0  | loop
    // 0  | 1  | 1  | loop
    // 0  | 1  | 0  | throw
    // 0  | 0  | 1  | throw
    // 0  | 0  | 0  | break
    // The paths above don't include the sticky mode special case. The loop ends after the
    // first completed match if not `global`.
    if (leftMatch || rightMatch) {
      delimStart = (
        (leftMatch as RegExpExecArray) || (rightMatch as RegExpExecArray)
      ).index;

      delimEnd =
        delimStart +
        ((leftMatch as RegExpExecArray) || (rightMatch as RegExpExecArray))[0]
          .length;
    } else if (!openTokens) {
      break;
    }

    if (sticky && !openTokens && delimStart > lastOuterEnd) {
      break;
    }

    if (leftMatch) {
      if (!openTokens) {
        outerStart = delimStart;
        innerStart = delimEnd;
      }

      openTokens += 1;
    } else if (rightMatch && openTokens) {
      openTokens -= 1;
      if (!openTokens) {
        if (outerStart > lastOuterEnd) {
          output.push({
            name: MuchResultTypes.OUTSIDE,
            value: str.slice(lastOuterEnd, outerStart),
            start: lastOuterEnd,
            end: outerStart,
          });
        }

        output.push({
          name: MuchResultTypes.INSIDE,
          value: str.slice(innerStart, delimStart),
          start: innerStart,
          end: delimStart,
          left: {
            value: str.slice(outerStart, innerStart),
            start: outerStart,
            end: innerStart,
          },
          right: {
            value: str.slice(delimStart, delimEnd),
            start: delimStart,
            end: delimEnd,
          },
        });

        lastOuterEnd = delimEnd;

        if (!global) {
          break;
        }
      }
    } else {
      if (rightMatch !== null) {
        throw new SyntaxError(
          `Unbalanced delimiter "${rightMatch}" was found in the template\n${str}\n${' '.repeat(
            rightMatch.index,
          )}${'^'.repeat(rightMatch.toString().length)}`,
        );
      } else {
        throw new SyntaxError(
          `Unbalanced delimiter found in the template\n${str}`,
        );
      }
    }

    // If the delimiter matched an empty string, avoid an infinite loop
    if (delimStart === delimEnd) {
      delimEnd += 1;
    }
  }

  if (global && str.length > lastOuterEnd) {
    output.push({
      name: MuchResultTypes.OUTSIDE,
      value: str.slice(lastOuterEnd),
      start: lastOuterEnd,
      end: str.length,
    });
  }

  return output;
}

export function regexpTest(str: string, regexp: RegExp, pos = 0) {
  regexp.lastIndex = pos;

  const test = regexp.test(str);

  if (regexp.global) {
    regexp.lastIndex = test ? regexp.lastIndex : 0;
  }

  return test;
}

export function regexpExec(str: string, regexp: RegExp, pos = 0) {
  regexp.lastIndex = pos;

  const match = regexp.exec(str);

  if (regexp.global) {
    regexp.lastIndex = match ? regexp.lastIndex : 0;
  }

  return match;
}

export function cleanArray(array: any[]) {
  for (let i = 0; i < array.length; i += 1) {
    if (typeof array[i] === 'undefined') {
      array.splice(i, 1);
      i -= 1;
    }
  }
}

export function matchInline(str: string, regexp: RegExp): MuchResult[] {
  const global = regexp.global;
  const sticky = regexp.sticky;
  const output: MuchResult[] = [];
  let lastEnd = 0;
  let leftStart = 0;
  let innerStart;
  let innerEnd;

  while (true) {
    const match = regexpExec(str, regexp, lastEnd);

    if (match === null) {
      break;
    }

    leftStart = match.index;

    if (sticky && leftStart > lastEnd) {
      break;
    }

    cleanArray(match);

    innerStart = leftStart + match[1].length;
    innerEnd = lastEnd + innerStart + match[2].length;

    if (leftStart > lastEnd) {
      output.push({
        name: MuchResultTypes.OUTSIDE,
        value: str.slice(lastEnd, leftStart),
        start: lastEnd,
        end: leftStart,
      });
    }

    output.push({
      name: MuchResultTypes.INSIDE,
      value: match[2],
      start: innerStart,
      end: innerEnd,
      left: {
        value: match[1],
        start: leftStart,
        end: innerStart,
      },
      right: {
        value: match[3],
        start: innerEnd,
        end: innerEnd + match[3].length,
      },
    });

    lastEnd = leftStart + match[0].length;

    if (!global) {
      break;
    }
  }

  if (global && str.length > lastEnd) {
    output.push({
      name: MuchResultTypes.OUTSIDE,
      value: str.slice(lastEnd),
      start: lastEnd,
      end: str.length,
    });
  }

  return output;
}
