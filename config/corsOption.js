const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
  // Allow all origins for testing
};
