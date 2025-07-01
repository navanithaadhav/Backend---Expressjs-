const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const logEvents = async (message,logName) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd HH:mm:ss")}`;
  const logItem = `${dateTime} \t${uuid()} \t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};
//custiom middleware
const logger = (req, res, next) => {
  logEvents(`${req.method} \t ${req.header.origin}\t ${req.url} \t${req.path}`,'errLog.txt');
  console.log(`${req.method} ${req.url} ${req.path}`);
  next();
};
module.exports = { logger, logEvents };
