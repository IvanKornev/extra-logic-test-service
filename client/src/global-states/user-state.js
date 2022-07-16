import { makeAutoObservable } from 'mobx';

class UserGlobalState {
  profile = {
    nickname: 'Ivan Kornev',
    email: 'kornevwebmonk@gmail.com',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

const userState = new UserGlobalState();
export { userState };
