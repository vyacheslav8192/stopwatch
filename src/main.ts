import "./styles/reset.css";
import "./styles/styles.css";
import { createButton } from "./components/button";
import { createStopwatch } from "./components/stopwatch";

const appElement = document.querySelector("#app");

if (!appElement) {
  throw new Error(`Element with id "app" is not found`);
}

const stopwatch = createStopwatch();

const startButton = createButton({
  text: "Старт",
  onClick: () => {
    startButton.hide();
    stopButton.show();
    stopwatch.start();
  },
});

const stopButton = createButton({
  text: "Стоп",
  onClick: () => {
    stopButton.hide();
    startButton.show();
    stopwatch.stop();
  },
});

stopButton.hide();
const resetButton = createButton({
  text: "Сброс",
  onClick: () => {
    startButton.show();
    stopButton.hide();
    stopwatch.reset();
  },
});

const layoutElement = document.createElement("div");
layoutElement.classList.add("layout", "container");

const headerElement = document.createElement("header");
headerElement.classList.add("header");

const mainElement = document.createElement("main");
mainElement.classList.add("main");

const footerElement = document.createElement("footer");
footerElement.textContent = "2026";
footerElement.classList.add("footer");

const headerContentElement = document.createElement("div");
headerContentElement.textContent = "Секундомер онлайн";

const triggersContainerElement = document.createElement("div");
triggersContainerElement.classList.add("triggers");

const stopwatchContainerElement = document.createElement("div");
stopwatchContainerElement.classList.add("stopwatch-container");

appElement.appendChild(layoutElement);

layoutElement.appendChild(headerElement);
layoutElement.appendChild(mainElement);
layoutElement.appendChild(footerElement);

headerElement.appendChild(headerContentElement);
mainElement.appendChild(stopwatchContainerElement);

triggersContainerElement.appendChild(startButton.element);
triggersContainerElement.appendChild(stopButton.element);
triggersContainerElement.appendChild(resetButton.element);

stopwatchContainerElement.appendChild(triggersContainerElement);
stopwatchContainerElement.appendChild(stopwatch.timeElement);
