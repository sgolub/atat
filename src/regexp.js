function match_recursive(str, left, right) {

	let global = left.global,
		sticky = left.sticky,
		output = [],
		openTokens = 0,
		delimStart = 0,
		delimEnd = 0,
		lastOuterEnd = 0,
		outerStart,
		innerStart,
		leftMatch,
		rightMatch;

	while (true) {

		leftMatch = regexp_exec(str, left, delimEnd);
		rightMatch = regexp_exec(str, right, delimEnd);

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

			delimStart = (leftMatch || rightMatch).index;

			delimEnd = delimStart + (leftMatch || rightMatch)[0].length;

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

			++openTokens;

		} else if (rightMatch && openTokens) {

			if (!--openTokens) {

				if (outerStart > lastOuterEnd) {

					output.push({
						name: VALUE_NAME_OUTSIDE,
						value: str.slice(lastOuterEnd, outerStart),
						start: lastOuterEnd,
						end: outerStart
					});
				}

				output.push({
					name: VALUE_NAME_INSIDE,
					value: str.slice(innerStart, delimStart),
					start: innerStart,
					end: delimStart,
					left: {
						value: str.slice(outerStart, innerStart),
						start: outerStart,
						end: innerStart
					},
					right: {
						value: str.slice(delimStart, delimEnd),
						start: delimStart,
						end: delimEnd
					}
				});

				lastOuterEnd = delimEnd;

				if (!global) {
					break;
				}
			}
		} else {
			throw new Error('Unbalanced delimiter found in string');
		}

		// If the delimiter matched an empty string, avoid an infinite loop
		if (delimStart === delimEnd) {
			++delimEnd;
		}
	}

	if (global && str.length > lastOuterEnd) {

		output.push({
			name: VALUE_NAME_OUTSIDE,
			value: str.slice(lastOuterEnd),
			start: lastOuterEnd,
			end: str.length
		});
	}

	return output;
}

function regexp_test(str, regexp, pos = 0) {

	regexp.lastIndex = pos;

	let test = regexp.test(str);

	if (regexp.global) {

		regexp.lastIndex = test ? regexp.lastIndex : 0;
	}

	return test;
}

function regexp_exec(str, regexp, pos = 0) {

	regexp.lastIndex = pos;

	let match = regexp.exec(str);

	if (regexp.global) {

		regexp.lastIndex = match ? regexp.lastIndex : 0;
	}

	return match;
}

function clean_array(array) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'undefined') {
			array.splice(i, 1);
			i--;
		}
	}
}

function match_inline(str, regexp) {

	let global = regexp.global,
		sticky = regexp.sticky,
		output = [],
		lastEnd = 0,
		leftStart = 0,
		innerStart,
		innerEnd;

	while (true) {

		let match = regexp_exec(str, regexp, lastEnd);

		if (match == null) {
			break;
		}

		leftStart = match.index;

		if (sticky && leftStart > lastEnd) {
			break;
		}

		clean_array(match);

		innerStart = leftStart + match[1].length;
		innerEnd = lastEnd + innerStart + match[2].length;

		if (leftStart > lastEnd) {
			output.push({
				name: VALUE_NAME_OUTSIDE,
				value: str.slice(lastEnd, leftStart),
				start: lastEnd,
				end: leftStart
			});
		}

		output.push({
			name: VALUE_NAME_INSIDE,
			value: match[2],
			start: innerStart,
			end: innerEnd,
			left: {
				value: match[1],
				start: leftStart,
				end: innerStart
			},
			right: {
				value: match[3],
				start: innerEnd,
				end: innerEnd + match[3].length
			}
		});

		lastEnd = leftStart + match[0].length;

		if (!global) {
			break;
		}
	}

	if (global && str.length > lastEnd) {

		output.push({
			name: VALUE_NAME_OUTSIDE,
			value: str.slice(lastEnd),
			start: lastEnd,
			end: str.length
		});
	}

	return output;
}
