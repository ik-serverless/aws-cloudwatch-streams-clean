"use strict";

const { get } = require('env-var');

module.exports = {
  region: get('REGION').required().asString(),
  delete: get('DELETE').required().asBoolStrict(),
  deleteDays: get('DELETE_DAYS').required().asIntPositive(),
  limit: get('LIMIT', 50).asIntPositive(),
};