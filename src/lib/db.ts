/**
 * Connects to the MongoDB database.
 *
 * @throws {Error} If unable to connect to the database.
 */

import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then((conn) => {
      console.log(`connected to db at ${conn.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

export default connectToDb;
