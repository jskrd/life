import './style.css';
import Universe from './src/Universe';

var universe = new Universe();

universe.size();
window.addEventListener('resize', universe.size);

const render = () => {
  universe.tick();
  universe.draw();
};

setInterval(render, 100);
