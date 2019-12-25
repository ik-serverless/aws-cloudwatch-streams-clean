"use strict";

const
  Log = require('@dazn/lambda-powertools-logger'),
  { provider } = require('./lib/provider'),
  { Logs } = require('./lib/cws'),
  config = require('./lib/config'),
  { ok, extractUsers } = require('./lib/utils');


const handler = async (event, ctx) => {
  Log.debug(`Event: ${JSON.stringify(event)}`);
  let logs = new Logs(provider, config.limit);
  let logGroups = await logs.fetchAllLogGroups();
  Log.info(`LogGroups: found ${logGroups.length}`);
  for (let group of logGroups) {
    let { logGroupName } = group;
    Log.debug(`LogGroup: analyze '${name}'`);
    let logStreams = await logs.fetchLogStreams(logGroupName);
    Log.debug(`LogStreams: found ${logStreams.length}`);
    if (config.delete) {
      for (let r in logStreams) {
        let { logStreamName } = logStreams[r];
        await deleteLogStream(logGroupName, logStreamName);
      }
    }
  }
  return ok('cleaned');
};

module.exports = {
  handler
};