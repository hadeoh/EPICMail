import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('dB connected successfully');
});

/**
 * Create User Table
 */
const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(500) UNIQUE NOT NULL,
        firstName VARCHAR(52)  NOT NULL,
        lastName VARCHAR(52)  NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
  await pool.query(queryText);
};

/**
 * Create status type of messages
 */

const createStatusType = async () => {
  const messageQueryText = `CREATE TYPE msg_status AS ENUM(
    'unread',
    'read',
    'draft'
  )`;
  await pool.query(messageQueryText);
};

/**
 * Create Messages Table
 */
const createMessageTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP DEFAULT now(),
    senderEmail VARCHAR(500) REFERENCES users (email),
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    parentMessageId INT NULL,
    receiverEmail VARCHAR(500),
    status msg_status NOT NULL DEFAULT 'unread'
  )`;
  await pool.query(queryText);
};

/**
 * Create Groups Table
 */
const createGroupTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) UNIQUE NOT NULL,
    role VARCHAR(60) NOT NULL DEFAULT 'admin' 
  )`;
  await pool.query(queryText);
};

const createGroupMembersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  groupMembers(
    id SERIAL PRIMARY KEY,
    userId VARCHAR(500) REFERENCES users(email),
    userRole VARCHAR(60) NOT NULL DEFAULT 'member'
  )`;
  await pool.query(queryText);
};

/**
 * Drop User Table
 */
const dropUserTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  await pool.query(queryText);
};

/**
 * Drop Status Type
 */
const dropStatusType = async () => {
  const messageQueryText = 'DROP TYPE IF EXISTS msg_status';
  await pool.query(messageQueryText);
};

/**
 * Drop Messages Table
 */
const dropMessageTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS messages';
  await pool.query(queryText);
};

/**
 * Drop Groups Table
 */
const dropGroupTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS groups';
  await pool.query(queryText);
};

/**
 * Drop Group Members Table
 */
const dropGroupMembersTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS groupMembers';
  await pool.query(queryText);
};


/**
 * Drop All Tables
 */
const dropAllTables = async () => {
  pool.connect();
  await dropGroupMembersTable();
  await dropGroupTable();
  await dropMessageTable();
  await dropStatusType();
  await dropUserTable();
  pool.end();
};


/**
 * Create All Tables
 */
const createAllTables = async () => {
  pool.connect();
  await createUserTable();
  await createGroupTable();
  await createGroupMembersTable();
  await createStatusType();
  await createMessageTable();
  pool.end();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  dropGroupMembersTable,
  dropGroupTable,
  dropUserTable,
  dropMessageTable,
  dropAllTables,
  createMessageTable,
  createUserTable,
  createAllTables,
  createGroupTable,
  createGroupMembersTable,
};

require('make-runnable');
