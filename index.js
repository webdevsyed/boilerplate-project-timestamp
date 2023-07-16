// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  // Check if date is empty
  if (req.params.date === undefined) {
    // console.log("empty")
    const date = new Date()
    res.json({ unix: Number(Math.floor(date.getTime() / 1000))*1000, utc: date.toUTCString() })
  }
  else {
    try {
      const parsedDate = Number(req.params.date)
      const date = new Date(req.params.date)

      if (isNaN(parsedDate)) {
        // console.log("input was a date or Invalid")
        if (!(date == "Invalid Date")) {
          res.json({ unix: Number(Math.floor(date.getTime() / 1000)) * 1000, utc: date.toUTCString() })
        }
        else {
          res.json({ error: "Invalid Date" })
        }
      } else {
        // console.log("input was in unix", parsedDate)
        const UTCDate = new Date(parsedDate).toUTCString()
        res.json({ unix: Number(req.params.date), utc: UTCDate })
      }









      // if (!(parsedDate === date) && !(date == "Invalid Date")) {
      //   res.json({ unix: Math.floor(date.getTime() / 1000), "utc": date.toUTCString() })

      // }
      // else if (parsedDate === date && !(new Date(req.params.date * 1000) == "Invalid Date")) {
      //   const UTCDate = new Date(req.params.date * 1000)
      //   res.json({ unix: req.params.date, "utc": UTCDate })
      // }
      // else {

      // }

    }

    catch (err) {
      console.log(err)
      res.json({ error: err })
    }

  }

  // res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(5001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
