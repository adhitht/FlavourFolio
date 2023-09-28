const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const pkg = require("pg");
const url = require("url");
const express = require("express");
const { spawn } = require("child_process");
const app = express();

// Handling environment variables
dotenv.config();
dotenv.config(".env");

// Handling Express JS Stuff
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const server = http.createServer(app);

// Connecting to PSQL server locally
const { Pool } = pkg;
const cur = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "folio",
  port: 5432,
});
cur.connect();

const verifyUser = (req, res, next) => {
  const cookie = req.cookies.authtoken;
  if (!cookie) {
      res.json({ auth: false })
  }
  else {
      jwt.verify(cookie, "flavourfolio_secret", (err, email) => {
          if (err) {
              res.json({ auth: false, message: "Invalid Token" });
          }
          else {
              res.locals.email = email;
              res.locals.userdata = email
              next();
          }
      });
  }
}

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/auth/google", passport.authenticate("google"));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    const query = "SELECT * FROM users WHERE email=$1";
    const data = await cur.query(query, [req.user.emails[0].value]);
    if (data.rows.length > 0) {
    } else {
      const newquery = `INSERT INTO users (google_id, email, display_name, avatar_url, created_at, updated_at) VALUES ('${
        req.user._json.sub
      }', '${req.user._json.email}',' ${req.user._json.name}','${
        req.user._json.picture
      }','${new Date().toISOString()}','${new Date().toISOString()}')`;
      cur.query(newquery, (error, results) => {
        if (error) throw error;
        console.log("New User Created");
      });
    }
    console.log(req.user._json.toString())
    const jwttoken = jwt.sign(req.user._json.toString(), "flavourfolio_secret");
    res.cookie("authtoken", jwttoken, { maxAge: 432000, httpOnly: true });
    res.redirect("http://localhost:5173");
  }
);

// Define a route to handle inference requests
app.post("/predict", (req, res) => {
  const inputData = req.body.inputData;
  const pythonProcess = spawn("python3", ["sentiment_analyser.py", inputData]);
  pythonProcess.stdout.on("data", (data) => {
    const result = data.toString();
    res.json({ prediction: result });
  });
  pythonProcess.on("error", (error) => {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  });
});

app.post("/review", (req, res) => {
  const review = req.body.review;
  const rating = req.body.rating;
  const user_id = req.body.user_id;
  const hotel_name = req.body.hotel_name;

  const inputData = req.body.inputData;
  const pythonProcess = spawn("python3", ["sentiment_analyser.py", inputData]);
  pythonProcess.stdout.on("data", (data) => {
    const result = data.toString();
    if(result == "positive\n"){
      sentimental_score = 1
    }else{ 
      sentimental_score = 0
    }

    const newquery = `INSERT INTO users (user_id, rating, review, created_at, tags, sentimental_score, hotel_name) VALUES 
    ('${user_id}', '${rating}',' ${review}','${new Date().toISOString()}',{"hello"}, '${sentimental_score}', ${hotel_name})`;
    cur.query(newquery, (error, results) => {
      if (error) throw error;
      console.log("New User Created");
    });
    
  });
  pythonProcess.on("error", (error) => {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  });



});

app.get("/getuser", verifyUser, (req, res)=> {
  res.json({"data": res.locals.userdata})
})


const port = 8000;
server.listen(port, () => {
  console.log("Server started on port " + port);
});
