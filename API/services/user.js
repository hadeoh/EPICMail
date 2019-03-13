import dummyData from '../utils/dummyData';

import User from '../models/user';

class UserService {
  constructor() {
    this.users = dummyData.Users;
  }

  static createAUser(users) {
    const usersLength = dummyData.Users.length;

    const lastId = dummyData.Users[usersLength - 1].id;

    const newId = lastId + 1;

    users.id = newId;

    dummyData.Users.push(users);


    return users;
  }
}

export default UserService;
