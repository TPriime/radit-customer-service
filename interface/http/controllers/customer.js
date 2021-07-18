const Customer = require("../models/customer");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;
const crypto = require("crypto");
var ObjectID = require('mongodb').ObjectID;


function _generateId() {
  // Get a timestamp in seconds
  var timestamp = Math.floor(new Date().getTime() / 1000);
  return new ObjectID(timestamp);
}


module.exports.createCustomer = async (req, res) => {
  var customer = new Customer({
    username:
      req.body.username.toString().toLowerCase(),
    password: req.body.password,
  });
  try {
    await customer.save();
    return res.status(200).json({
      status: Success.SUCCESS,
      message: Success.CREATED_CUSTOMER_DATA,
      customer: customer,
    });
  } catch (err) {
    console.error(err)
    return res.status(403).json({
      status: Errors.FAILED,
      error: Errors.DUPLICATE_ACCOUNT
    });
  }
  
};

module.exports.getCustomer = async (req, res) => {
  await Customer.findOne(
    {
      username: req.params.username
    },
    {
      _id: 1,
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
    (error, customer) => {
      if (error || !customer) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.USER_NOT_EXISTS,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_CUSTOMER_DATA,
        customer: customer,
      });
    }
  );
};


module.exports.deleteCustomer = async (req, res) => {
  var s = await Customer.deleteOne({ username: req.params.username }, async (error) => {
    if (error)
      return res.status(403).json({
        status: Errors.FAILED,
        message: Errors.ACC_DELETE_FAILED,
      });
  });

  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.DELETED_CUSTOMER_DATA,
  });
}

module.exports.getAllCustomers = async (req, res) => {
  await Customer.find(
    {
      password: 0,
    },
    (error, customers) => {
      if (error || !customers) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.USER_NOT_EXISTS,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_CUSTOMER_DATA,
        customers: customers,
      });
    }
  );
};