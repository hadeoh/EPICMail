import db from './dB/index';

/** Start dummy users */
const user1values = [
  'franchesqa@epicmail.com',
  'franchess',
  'sandra',
  'yh89uyightGH',
];

const user2values = [
  'ojematthew@epicmail.com',
  'ifeoluwa',
  'matthew',
  'yh89uyightGH',
];

const user3values = [
  'toluniyin@epicmail.com',
  'toluwalope',
  'iyinoluwa',
  'yh89uyightGH',
];

const user4values = [
  'vincicode@epicmail.com',
  'vinci',
  'lorenzo',
  'yh89uyightGH',
];

const user5values = [
  'petergolden@epicmail.com',
  'peter',
  'golden',
  'yh89uyightGH',
];
  /** End dummy users */

/** Start dummy messages */
const mssg1values = [
  'ojematthew@epicmail.com',
  'vincicode@epicmail.com',
  'testdata',
  'testing with mocha is fun',
];

const mssg2values = [
  'ojematthew@epicmail.com',
  'vincicode@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg3values = [
  'toluniyin@epicmail.com',
  'vincicode@epicmail.com',
  'testdata',
  'testing with mocha is fun',
];

const mssg4values = [
  'franchesqa@epicmail.com',
  'vincicode@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg5values = [
  'vincicode@epicmail.com',
  'franchesqa@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg6values = [
  'vincicode@epicmail.com',
  'ojematthew@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg7values = [
  'vincicode@epicmail.com',
  'toluniyin@epicmail.com',
  'testdata',
  'testing with mocha is fun',
];

const mssg8values = [
  'vincicode@epicmail.com',
  'franchesqa@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg9values = [
  'vincicode@epicmail.com',
  'ojematthew@epicmail.com',
  'grepping',
  'npm testing api, api is application....',
];

const mssg10values = [
  'vincicode@epicmail.com',
  'toluniyin@epicmail.com',
  'testdata',
  'testing with mocha is fun',
];
  /** End dummy messages */

/** Start dummy groups */
const group1 = [
  'fries maker',
];
const group2 = [
  'post writer',
];
const group3 = [
  'camp support',
];
const group4 = [
  'data students',
];
const group5 = [
  'admin',
];
  /** End dummy groups */

/** Start dummy groups members */
const friesadmin = [
  1,
  1,
  'franchesqa@epicmail.com',
];

const friesMember1 = [
  1,
  2,
  'ojematthew@epicmail.com',
];

const friesMember2 = [
  1,
  3,
  'toluniyin@epicmail.com',
];

const writersAdmin = [
  2,
  2,
  'ojematthew@epicmail.com',
];

const writersMember1 = [
  2,
  3,
  'toluniyin@epicmail.com',
];

const campAdmin = [
  3,
  5,
  'petergolden@epicmail.com',
];
  /** End dummy groups members */

/** Start dummy groups messgaes */
const message1 = [
  1,
  'ojematthew@epicmail.com',
  'testing group message',
  'Ensure to Setup Environment variables',
];

const message2 = [
  1,
  'ojematthew@epicmail.com',
  'testing group message',
  'Ensure to Setup Environment variables',
];

const message3 = [
  1,
  'ojematthew@epicmail.com',
  'testing group message',
  'Ensure to Setup Environment variables',
];

const message4 = [
  1,
  'ojematthew@epicmail.com',
  'testing group message',
  'Ensure to Setup Environment variables',
];

const message5 = [
  1,
  'ojematthew@epicmail.com',
  'testing group message',
  'Ensure to Setup Environment variables',
];
  /** End dummy groups messgaes */

const insertUsers = async () => {
  const insertUser = `INSERT INTO
    users(email, firstName, lastName, password)
    VALUES($1, $2, $3, $4) RETURNING *`;

  await db.query(insertUser, user1values);
  await db.query(insertUser, user2values);
  await db.query(insertUser, user3values);
  await db.query(insertUser, user4values);
  await db.query(insertUser, user5values);
};

const insertMessages = async () => {
  const insertMessage = `INSERT INTO
          messages( receiverEmail, senderEmail, subject, message)
          VALUES($1, $2, $3, $4)
          RETURNING *`;

  await db.query(insertMessage, mssg1values);
  await db.query(insertMessage, mssg2values);
  await db.query(insertMessage, mssg3values);
  await db.query(insertMessage, mssg4values);
  await db.query(insertMessage, mssg5values);
  await db.query(insertMessage, mssg6values);
  await db.query(insertMessage, mssg7values);
  await db.query(insertMessage, mssg8values);
  await db.query(insertMessage, mssg9values);
  await db.query(insertMessage, mssg10values);
};

const insertGroups = async () => {
  const insertGroup = `INSERT INTO
      groups(name)
      VALUES($1) RETURNING *`;

  await db.query(insertGroup, group1);
  await db.query(insertGroup, group2);
  await db.query(insertGroup, group3);
  await db.query(insertGroup, group4);
  await db.query(insertGroup, group5);
};

const insertGroupMembers = async () => {
  const addGroupMembersQuery = `INSERT INTO
      groupMembers(groupId, userId, userEmail)
      VALUES($1, $2, $3) RETURNING *`;

  await db.query(addGroupMembersQuery, friesadmin);
  await db.query(addGroupMembersQuery, friesMember1);
  await db.query(addGroupMembersQuery, friesMember2);
  await db.query(addGroupMembersQuery, writersAdmin);
  await db.query(addGroupMembersQuery, writersMember1);
  await db.query(addGroupMembersQuery, campAdmin);
};

const insertGroupMessages = async () => {
  const groupMessageQuery = `INSERT INTO
        groupMessages( groupId, senderEmail, subject, message)
        VALUES($1, $2, $3, $4)
        returning *`;

  await db.query(groupMessageQuery, message1);
  await db.query(groupMessageQuery, message2);
  await db.query(groupMessageQuery, message3);
  await db.query(groupMessageQuery, message4);
  await db.query(groupMessageQuery, message5);
};

const insertData = async () => {
  await insertUsers();
  await insertMessages();
  await insertGroups();
  await insertGroupMembers();
  await insertGroupMessages();
};

module.exports = {
  insertData,
};

require('make-runnable');