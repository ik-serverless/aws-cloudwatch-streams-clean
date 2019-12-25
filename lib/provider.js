"use strict";

const
  config = require("./config"),
  AWS = require('aws-sdk'),
  provider = new AWS.CloudWatchLogs({ region: config.region });

module.exports = { provider };
