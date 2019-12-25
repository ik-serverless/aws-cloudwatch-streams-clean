"use strict";

const
  { days } = require("./utils");

const paginate = async (fn) => {
  const EMPTY = Symbol("empty");
  const res = [];
  for await (const lf of (async function* () {
    let token = EMPTY;
    while (token || token === EMPTY) {
      const { marker, results } = await fn(token !== EMPTY ? token : undefined);
      yield* results;
      token = marker;
    }
  })()) {
    if (typeof lf !== 'undefined') {
      res.push(lf);
    }
  }
  return res;
};

class Logs {
  constructor(provider, limit) {
    this.provider = provider;
    this.limit = limit;
  }

  async fetchAllLogGroups() {
    const res = await paginate(async (token) => {
      const logGroups = await this.provider.describeLogGroups({
        limit: this.limit,
        nextToken: token
      }).promise();
      return {
        marker: logGroups.nextToken,
        results: logGroups.logGroups.map(({ logGroupName }) => ({ logGroupName })),
      };
    });
    return res;
  }

  async fetchLogStreams(name, exclude) {
    let now = new Date();
    const res = await paginate(async (token) => {
      const logStreams = await this.provider.describeLogStreams({
        logGroupName: name,
        descending: false,
        limit: this.limit,
        orderBy: 'LastEventTime',
        nextToken: token
      }).promise();
      let marker = logStreams.nextToken;
      let streams = logStreams.logStreams.map(({ logStreamName, lastEventTimestamp }) => {
        let timestamp = days(lastEventTimestamp, now);
        if (timestamp >= exclude) {
          return {
            logStreamName: logStreamName,
            lastEventTimestamp: timestamp,
          };
        }
      });
      return {
        marker: marker,
        results: streams,
      };
    });
    return res;
  }

  async deleteLogStream(group, stream) {
    await this.provider.deleteLogStream({
      logGroupName: group,
      logStreamName: stream
    });
  }
}

module.exports = {
  Logs
};
