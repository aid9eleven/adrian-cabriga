export default class Timer {
  secondsLeft: number;
  isPaused: boolean;

  constructor() {
    this.secondsLeft = 0;
    this.isPaused = false;

    setInterval(() => {
      if (!this.isPaused)
        this.setTime(this.secondsLeft - 0.1);
    }, 100);
  }

  setTime = (seconds: number) => {
    this.secondsLeft = Math.max(seconds, 0);
  }

  hasTimerStopped = ():boolean => {
    return (this.secondsLeft <= 0);
  }

  pause = () => {
    this.isPaused = true;
  }

  unpause = () => {
    this.isPaused = false;
  }
}
