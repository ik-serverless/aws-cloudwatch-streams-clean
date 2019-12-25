"use strict";

const
  { region } = require("./config"),
  AWS = require('aws-sdk'),
  provider = new AWS.CloudWatchLogs();

AWS.config.update({ region: region });

module.exports = { provider };
