import './assets/style.scss';
import typescriptLogo from './typescript.svg'
import teslaLogo from './assets/images/logo.svg';
import teslaBanner from './assets/images/hero-image@2x.png';
import { loadAndDisplayHTML } from './core/renderer.ts';
import homeContent from './views/home.html?raw';
import ReactivityDemo from './views/reactivity-demo.html?raw';
import FooterView from './views/footer.html?raw';
import { handleAcHeater, handleTemperature } from './logic/heater.ts';
import { handleToggleWheels } from './logic/wheels.ts';
import { handleSpeed } from './logic/speed.ts';
import { fetchData } from './api/data/fetchData.ts';

function home(): ReactiveTemplate {
  async function render() {
    await loadAndDisplayHTML('#app', homeContent, {
      'typescriptLogo': typescriptLogo,
      'teslaLogo': teslaLogo,
      'teslaBanner': teslaBanner
    })
    await loadAndDisplayHTML('#reactivity-demo', ReactivityDemo, {})
    await loadAndDisplayHTML('#footer', FooterView, {})
  }

  return { render };
}

home().render().then(() => {
  fetchData()
});

window.handleToggleWheels = handleToggleWheels;
window.handleTemperature = handleTemperature;
window.handleSpeed = handleSpeed;
window.handleAcHeater = handleAcHeater;

