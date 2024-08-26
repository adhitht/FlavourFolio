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
  connectionString: process.env.DATABASE_URL,
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
        const user_id = results.rows[0].user_id;
        console.log("USER ID IS", user_id)
        console.log("New User Created");
      });
    }
    const jwttoken = jwt.sign(req.user._json.toString(), "flavourfolio_secret");
    res.cookie("authtoken", jwttoken, { maxAge: 432000, httpOnly: false });
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

  const pythonProcess = spawn("python3", ["sentiment_analyser.py", review]);
  pythonProcess.stdout.on("data", (data) => {
    const result = data.toString();
    if(result == "positive\n"){
      sentimental_score = 1
    }else{ 
      sentimental_score = 0
    }

    const newquery = `INSERT INTO reviews(user_id, rating, review, created_at, tags, sentimental_score, hotel_name) VALUES 
    ('${user_id}', '${rating}',' ${review}','${new Date().toISOString()}','{"data": "food"}', '${sentimental_score}', '${hotel_name}')`;
    cur.query(newquery, (error, results) => {
      if (error) throw error;
      res.json({"success": true})
    });
    
  });
  pythonProcess.on("error", (error) => {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  });
});

app.get("/restaurants", async (req,res) => {
  query = 'SELECT hotel_name,(ARRAY_AGG(picture ORDER BY picture))[1] AS picture, COUNT(rating), AVG(rating) AS average_rating, AVG(sentimental_score) AS average_sentiment_score FROM reviews GROUP BY hotel_name;'
  cur.query(query, (error, results) => {
    if (error) throw error;
    res.send(results.rows)
  });
})

app.get("/getrestaurant", async (req,res) => {
  console.log(req.query.hotel_name)
  query = `SELECT hotel_name,(ARRAY_AGG(picture ORDER BY picture))[1] AS picture,COUNT(*) as numberofreviews, AVG(rating) as rating, COUNT(*) FILTER (WHERE rating = 1) AS count_rating_1,COUNT(*) FILTER (WHERE rating = 2) AS count_rating_2,COUNT(*) FILTER (WHERE rating = 3) AS count_rating_3,COUNT(*) FILTER (WHERE rating = 4) AS count_rating_4,COUNT(*) FILTER (WHERE rating = 5) AS count_rating_5, AVG(sentimental_score) AS sentimental_score FROM reviews WHERE hotel_name = '${req.query.hotel_name}' GROUP BY hotel_name;`
  cur.query(query, (error, results) => {
    if (error) throw error;
    // if (results.rows.length === 0) {
      // res.send({ "notFound": true });
    // } else {
      res.send(results.rows);
    // }
  });
})

app.get("/getreviews", async (req,res) => {
  console.log(req.query.hotel_name)
  query = `SELECT * from reviews WHERE hotel_name='${req.query.hotel_name}';`
  query=`SELECT
  r.rating,
  r.review,
  r.created_at AS review_created_at,
  r.sentimental_score,
   u.display_name, 
   u.avatar_url as photo
    FROM reviews AS r JOIN users AS u ON r.user_id = u.user_id WHERE hotel_name='${req.query.hotel_name}';`
  console.log(query)
  cur.query(query, (error, results) => {
    if (error) throw error;
      res.send(results.rows);
  });
})

app.get("/getuser", verifyUser, (req, res)=> {
  res.json({"data": res.locals.userdata})
})


const port = 8000;
server.listen(port, () => {
  console.log("Server started on port " + port);
});
