const mongoose = require("mongoose");
const { CUSTOMER_COLLECTION: CUSTOMER_COLLECTION } = require("../utils/constants").collections;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(CUSTOMER_COLLECTION, userSchema);
