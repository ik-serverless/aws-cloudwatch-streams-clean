"use strict";

const
  Log = require('@dazn/lambda-powertools-logger');

const
  { provider } = require('./lib/provider'),
  { Logs } = require('./lib/cws'),
  config = require('./lib/config'),
  { ok, extractUsers } = require('./lib/utils'),
  LIMIT = 5;


const handler = async (event, ctx) => {
  Log.debug(`Event: ${JSON.stringify(event)}`);
  let logs = new Logs(provider, LIMIT);
  let logGroups = await logs.fetchAllLogGroups();
  Log.info(`LogGroups: found ${logGroups.length}`);
  for (let group of logGroups) {
    let { logGroupName } = group;
    Log.debug(`LogGroup: analyze '${name}'`);
    let logStreams = await logs.fetchLogStreams(logGroupName);
    Log.debug(`LogStreams: found ${logStreams.length}`);
    for (let r in logStreams) {
      let { logStreamName } = logStreams[r]
      await deleteLogStream(logGroupName, logStreamName);
    }
  }
  Log.info(`fetched and analyzed`);
  return ok(`OK`);
};

module.exports = {
  handler
};