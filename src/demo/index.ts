import 'normalize.css';
import './styles.scss';
import './vscode-theme.scss';
import debounce from 'lodash/debounce';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/placeholder';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import CodeMirror from 'codemirror';
import { render } from 'atat';

const onButton = document.getElementById('turn-lights-on');
const offButton = document.getElementById('turn-lights-off');
const htmlElement = document.body.parentElement;
const theme = localStorage.getItem('theme');

if (theme) {
  htmlElement.classList.add(theme);
}

onButton.addEventListener('click', () => {
  htmlElement.classList.remove('dark');
  htmlElement.classList.add('light');
  localStorage.setItem('theme', 'light');
});

offButton.addEventListener('click', () => {
  htmlElement.classList.remove('light');
  htmlElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
});

setupDemo(
  'template-simple',
  'data-simple',
  'result-simple',
  'error-simple',
  `@!(it.html)@
@(new Date(it.date))@`,
  `{
  "html": "<h1>Hello World!</h1>",
  "date": 1585218258461
}`,
);

setupDemo('template', 'data', 'result', 'error');

function setupDemo(
  templateId,
  dataId,
  resultId,
  errorId,
  templateValue = '',
  dataValue = '',
) {
  const defConfig = {
    mode: 'htmlmixed',
    scrollbarStyle: 'simple',
    tabSize: 2,
    theme: 'vscode',
  };
  const template = CodeMirror.fromTextArea(
    document.getElementById(templateId) as HTMLTextAreaElement,
    {
      ...defConfig,
      placeholder: 'Put tamplate code here...',
    },
  );
  const data = CodeMirror.fromTextArea(
    document.getElementById(dataId) as HTMLTextAreaElement,
    {
      ...defConfig,
      placeholder: 'Put JSON model here...',
      mode: 'javascript',
    },
  );
  const result = CodeMirror(document.getElementById(resultId), {
    ...defConfig,
    readOnly: true,
  });
  const error = document.getElementById(errorId);

  const onchange = debounce(async () => {
    try {
      const html = await render(
        template.getValue(),
        JSON.parse(data.getValue() || '{}'),
      );
      error.textContent = '';
      error.style.display = 'none';
      result.getWrapperElement().style.display = 'inherit';
      result.setValue(html);
    } catch (e) {
      result.setValue('');
      result.getWrapperElement().style.display = 'none';
      error.textContent = `${e.toString()}`;
      error.style.display = 'block';
    }
  }, 500);

  template.on('change', onchange);
  data.on('change', onchange);

  template.setValue(templateValue);
  data.setValue(dataValue);
}
