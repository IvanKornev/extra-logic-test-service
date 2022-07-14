import { Timestamp } from '../timestamp';
import { faker } from '@faker-js/faker';

describe('Тестирует статичные методы класса Timestamp', () => {
  it('Сконвертирует значение в дату без времени', () => {
    const timestamp = 1649312452;
    const result = Timestamp.toHumanReadableDate(timestamp);
    expect(result).toBe('4 март., 2022');
  });

  it('Выбросит ошибку при передаче не числа', () => {
    const methodCall = () =>
      Timestamp.toHumanReadableDate(faker.word.adjective(8));
    expect(methodCall).toThrow('Значение timestamp - число');
  });
});
