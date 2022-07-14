export class Timestamp {
  static toHumanReadableDate(timestamp) {
    this.#checkTimestamp(timestamp);
    const date = new Date(timestamp * 1000);

    const [currentDay] = this.#getIsoDate();
    const [receivedDay] = this.#getIsoDate(date);
    if (currentDay === receivedDay) {
      const time = this.#getCurrentTime(date);
      return time;
    }

    const day = this.#getCurrentDay(date);
    return day;
  }

  static #checkTimestamp(value) {
    if (typeof value !== 'number') {
      const errorText = 'Значение timestamp - число';
      throw new Error(errorText);
    }
  }

  static #getCurrentTime(date) {
    let minutes = `0${date.getMinutes()}`;
    minutes = minutes.substring(0, 2);

    let seconds = `0${date.getSeconds()}`;
    seconds = seconds.substring(0, 2);

    let hours = date.getHours();
    hours = hours >= 10 && hours <= 24 ? hours : `0${hours}`;
    const result = `в ${hours}:${minutes}:${seconds}`;
    return result;
  }

  static #getCurrentDay(date) {
    const months = [
      'янв',
      'февр',
      'март',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сент',
      'окт',
      'нояб',
      'дек',
    ];
    const monthIndex = date.getMonth() - 1;

    const month = months[monthIndex];
    const day = date.getDay();
    const year = date.getFullYear();
    const result = `${day} ${month}., ${year}`;
    return result;
  }

  static #getIsoDate(value = null) {
    let date = new Date();
    if (value) {
      date = new Date(value);
    }
    return date.toISOString().split('T');
  }
}
