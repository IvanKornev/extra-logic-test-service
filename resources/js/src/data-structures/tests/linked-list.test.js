import { faker } from '@faker-js/faker';
import { LinkedList } from '../linked-list';

describe('Односвязный список', () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  it('Добавляет несколько нод в список', () => {
    const uniqueId = faker.datatype.uuid();
    list.insert({ uniqueId });
    expect(list.head.value.uniqueId).toBe(uniqueId);
    expect(list.head.value.uniqueId).toBe(uniqueId);
  });

  it('Находит ноду по id среди десятка других', () => {
    const uniqueId = faker.datatype.uuid();
    fillList(uniqueId, list);
    const foundNode = list.find(uniqueId);
    expect(foundNode.value.uniqueId).toBe(uniqueId);
  });

  it('Возвращает false при попытке найти неизвестную ноду', () => (
    expect(list.find(105)).toBeFalsy()
  ));

  it('Заменяет значение ноды, найденной по id', () => {
    const uniqueId = faker.datatype.uuid();
    const emails = {
      old: faker.internet.email(),
      new: faker.internet.email(),
    };

    list.insert({ uniqueId, email: emails.old });
    expect(list.head.value.email).toBe(emails.old);

    list.change(uniqueId, { email: emails.new });
    expect(list.head.value.email).toBe(emails.new);
  });

  it('Удаляет ноду по id', () => {
    const uniqueId = faker.datatype.uuid();
    fillList(uniqueId, list);

    expect(list.find(uniqueId)).toBeTruthy();
    list.remove(uniqueId);
    expect(list.find(uniqueId)).toBeFalsy();
  });

  it('Копирует первую ноду, делая её следующей в списке', () => {
    const email = faker.internet.email();
    const uniqueId = faker.datatype.uuid();
    list.insert({ uniqueId, email });
    list.copy(uniqueId);

    const tailId = faker.datatype.uuid();
    list.insert({ uniqueId: tailId });

    const copy = list.head.next;
    expect(copy.value.email).toBe(email);
    expect(list.tail.value.uniqueId).toBe(tailId);
  });
});

const fillList = (uniqueId, list) => {
  for (let i = 0; i <= 10; i += 1) {
    if (i === 5) {
      list.insert({ uniqueId });
    }
    list.insert(faker.datatype.uuid());
  }
};
