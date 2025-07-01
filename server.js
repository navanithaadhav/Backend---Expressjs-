const { log } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const subdir = require("./routes/subdir");
const corsOptions=require("./config/corsOption");
const PORT = process.env.PORT || 3001;
//custiom middleware
app.use(logger);
// Enable CORS

app.use(cors(corsOptions));

//build in middleware
app.use(express.urlencoded({ extended: false }));//by use get FORM
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/subdir", express.static(path.join(__dirname, "./public")));
app.use("/subdir", subdir);
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello.html load panna try panrom");
    next();
  },
  (req, res) => {
    res.send("hello makkale");
  }
);
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);
//ithu last ah than podanum
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});
app.use(errorHandler);//last la than podanm
app.listen(PORT, () => console.log("server is rnning on", PORT));
