'use strict';

const
  HOURS_IN_A_DAY = 24;

const ok = data => {
  return json(200, data);
};

const error = data => {
  return json(400, data);
};

const json = (statusCode, data) => {
  return ({
    statusCode,
    body: JSON.stringify(data),
  });
};

const days = (createDate, current) => {
  return Math.round(Number(Math.abs(current - createDate) / 36e5) / HOURS_IN_A_DAY);
};

module.exports = {
  ok,
  days
};

