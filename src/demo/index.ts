import 'normalize.css';
import './styles.scss';
import './vscode-theme.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import CodeMirror from 'codemirror';
import { render, config, FETCH_LOADER } from 'atat';
import model from './model.txt';
import template from './template.txt';

config({ loader: FETCH_LOADER });

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
  'encoded-output-demo',
  template,
  model,
);

function setupDemo(demoId, templateValue = '', dataValue = '') {
  const defConfig = {
    mode: 'htmlmixed',
    scrollbarStyle: 'simple',
    tabSize: 2,
    theme: 'vscode',
    extraKeys: {
      F11: function (cm) {
        cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        cm.setOption('lineNumbers', cm.getOption('fullScreen'));
      },
      Esc: function (cm) {
        if (cm.getOption('fullScreen')) {
          cm.setOption('fullScreen', false);
        }
        cm.setOption('lineNumbers', cm.getOption('fullScreen'));
      },
    },
  };
  const demo = document.getElementById(demoId);
  const template = CodeMirror.fromTextArea(
    demo.querySelector('.template>textarea'),
    {
      ...defConfig,
      placeholder: 'Put tamplate code here...',
    },
  );
  const data = CodeMirror.fromTextArea(demo.querySelector('.data>textarea'), {
    ...defConfig,
    placeholder: 'Put JSON model here...',
    mode: 'javascript',
  });
  const result = CodeMirror(demo.querySelector('.result-output'), {
    ...defConfig,
    readOnly: true,
  });
  const error = demo.querySelector('.error') as HTMLDivElement;

  const height = '39vh';
  template.setSize(null, height);
  data.setSize(null, height);
  result.setSize(null, height);

  const onchange = async () => {
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
  };

  template.on('change', onchange);
  data.on('change', onchange);

  template.setValue(templateValue);
  data.setValue(dataValue);
}
