import { faker } from '@faker-js/faker';
import { getUserAvatarText } from '@entities';

describe('Методы, связанные с пользователем', () => {
  it('Получает текст для аватарки авторизованного пользователя', () => {
    const user = {
      nickname: faker.name.firstName(),
      isAuthorized: true,
    };
    const expectedText = nickname[0].toUpperCase();
    expect(getUserAvatarText(user)).toBe(expectedText);
  });

  it('Получает текст для аватарки неавторизованного пользователя', () => {
    const user = {
      isAuthorized: false,
    };
    const expectedText = '?';
    expect(getUserAvatarText(user)).toBe(expectedText);
  });
});
