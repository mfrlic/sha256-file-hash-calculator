function formatTime(milliseconds?: number) {
  if (!milliseconds) {
    return "N/A";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pluralize = (value: number, unit: string) => {
    return value === 1 ? unit : unit + "s";
  };

  const time = [];

  if (hours > 0) {
    time.push(`${hours} ${pluralize(hours, "hour")}`);
  }

  if (minutes > 0) {
    time.push(`${minutes} ${pluralize(minutes, "minute")}`);
  }

  if (seconds > 0) {
    time.push(`${seconds} ${pluralize(seconds, "second")}`);
  }

  if (time.length > 0) {
    return time.join(", ");
  }

  return `${milliseconds.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })} ${pluralize(milliseconds, "millisecond")}`;
}

export default formatTime;
