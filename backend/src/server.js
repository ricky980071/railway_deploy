import express from 'express';
import cors from 'cors';
import db from './db.js';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import path from "path";

// dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
// mongoose.connect(process.env.MONGO_URL, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  })
db.connect();
if (process.env.NODE_ENV === "development") {
    app.use(cors());
}
app.use(express.json())

app.use(bodyParser.json());////////
app.use('/', routes);

//  .then((res) => console.log("mongo db connection created"));
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
  }



app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);