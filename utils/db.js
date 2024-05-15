#!/usr/bin/node

import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Representation of a MongoDB client.
 */
class DBClient {
  /**
   * Here, we created a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Here, we check successful  client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    const clientData = this.client.isConnected();
    return clientData;
  }

  /**
   * Fetches the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    const nBUserdata = this.client.db().collection('users').countDocuments();
    return nBUserdata;
  }

  /**
   * Fetches the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Fetches the reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Fetches the reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
