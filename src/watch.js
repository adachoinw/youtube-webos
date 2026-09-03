import { configRead, configAddChangeListener } from './config';
import './watch.css';

class Watch {
  #watch;
  #timer;
  #alignTimer;

  constructor() {
    this.createElement();
    this.startClock();
  }

  createElement() {
    this.#watch = document.createElement('div');
    this.#watch.className = 'webOs-watch';
    document.body.appendChild(this.#watch);
  }

  startClock() {
    const nextSeg = (60 - new Date().getSeconds()) * 1000;

    const formatter = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric'
    });

    const setTime = () => {
      this.#watch.innerText = formatter.format(new Date());
    };

    setTime();
    this.#alignTimer = setTimeout(() => {
      setTime();
      this.#timer = setInterval(setTime, 60000);
    }, nextSeg);
  }

  destroy() {
    clearTimeout(this.#alignTimer);
    clearInterval(this.#timer);
    this.#watch?.remove();
  }
}

let watchInstance = null;

function toggleWatch(show) {
  if (show) {
    watchInstance = watchInstance ? watchInstance : new Watch();
  } else {
    watchInstance?.destroy();
    watchInstance = null;
  }
}

toggleWatch(configRead('showWatch'));

configAddChangeListener('showWatch', (evt) => {
  toggleWatch(evt.detail.newValue);
});
