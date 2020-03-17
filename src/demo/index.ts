import 'normalize.css';
import './styles.scss';
import debounce from 'lodash/debounce';
import { render } from 'atat';

const template = document.getElementById('template') as HTMLTextAreaElement;
const data = document.getElementById('data') as HTMLTextAreaElement;
const result = document.getElementById('result') as HTMLElement;
const error = document.getElementById('error') as HTMLElement;

template.onkeyup = data.onkeyup = debounce(async () => {
  try {
    const html = await render(template.value, JSON.parse(data.value || '{}'));
    error.textContent = '';
    result.textContent = html;
  } catch (e) {
    result.textContent = '';
    error.textContent = `${e.toString()}`;
  }
}, 1000);
