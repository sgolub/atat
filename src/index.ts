import { render } from 'atat';

render('Hello @(it.world)@!', { world: 'World' }).then(result => {
  console.log(result);
});
