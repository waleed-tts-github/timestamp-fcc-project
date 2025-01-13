import express from "express";
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  //if i am getting date in unix format, then i need to convert into number. Because by default params come in string format
  if (!isNaN(date)) {
    date = Number(date);
  }
  let unix = new Date(date).getTime();
  let utc = new Date(date).toUTCString();
  const timestamp = Number(unix);
  // Check if the timestamp is within the valid range for seconds
  if (!(timestamp > 0 && timestamp < 253402300799999) || isNaN(unix)) {
    return res.json({
      error: "Invalid Date",
    });
  }

  return res.json({ unix, utc });
});

app.get("/api/", (req, res) => {
  return res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
