import styles from "./stopwatch.module.css";

const timeFormatter = new Intl.DurationFormat("ru", {
  fractionalDigits: 2,
  style: "digital",
});

type UpdateTimeType = Extract<
  keyof Temporal.DurationLikeObject,
  "milliseconds" | "seconds" | "minutes" | "hours"
>;
type UpdateTimeOperation = Extract<keyof Temporal.Duration, "add" | "subtract">;

const initializeTime = () => {
  return Temporal.Duration.from({ microseconds: 0 });
};

const createStopwatch = () => {
  const timeElement = document.createElement("time");
  timeElement.classList.add(styles.time);

  let time: Temporal.Duration = initializeTime();
  let intervalId: number | null = null;
  let isRunning = false;

  const updateTime = (options: {
    type: UpdateTimeType;
    operation: UpdateTimeOperation;
    amount: number;
  }) => {
    const { type, amount, operation } = options;
    time = time[operation]({ [type]: amount });
  };

  const start = () => {
    if (isRunning) return;

    isRunning = true;
    intervalId = setInterval(() => {
      updateTime({ type: "milliseconds", amount: 10, operation: "add" });
      render();
    }, 10);
  };

  const stop = () => {
    if (!isRunning) return;
    isRunning = false;

    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const reset = () => {
    stop();
    time = initializeTime();
    render();
  };

  const getFormattedTime = () => {
    const { hours, minutes, seconds, milliseconds } = time;

    return timeFormatter.format({ hours, minutes, seconds, milliseconds });
  };

  const render = () => {
    timeElement.textContent = getFormattedTime();
  };

  const destroy = () => {
    stop();
    timeElement.remove();
  };

  render();

  return {
    timeElement,
    updateTime,
    render,
    start,
    stop,
    reset,
    getFormattedTime,
    get isRunning() {
      return isRunning;
    },
    destroy,
  };
};

export { createStopwatch };
