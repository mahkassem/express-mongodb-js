import db from "../db.js";

const collection = 'users';

export const getUserByUsername = async (username) => {
  const result = await db
    .collection(collection)
    .findOne({ username });

  return result;
}

export const createUser = async (user) => {
  const {
    _id,
    username,
    password,
    customer_id,
  } = user;
  const result = await db
    .collection(collection)
    .insertOne({
      _id: Number(_id),
      username,
      password,
      customer_id,
    });

  return result;
}

export const updateUser = async (id, user) => {
  const {
    password,
  } = user;

  const result = await db
    .collection(collection)
    .updateOne(
      { _id: Number(id) },
      {
        $set: {
          password,
        }
      }
    );

  return result;
}