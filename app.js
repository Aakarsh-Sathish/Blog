const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var posts = [];

app.get("/", function (req, res) {
  res.render("index", {});
});
app.get("/blog", function (req, res) {
  res.render("blog", {
    posts: posts,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/compose", function (req, res) {
  var post = {
    title: req.body.Title,
    date: req.body.date,
    blog: req.body.blogpost,
  };

  posts.push(post);

  res.redirect("/blog");
});

app.get("/posts/:postname", function (req, res) {
  const posttitle = _.lowerCase(req.params.postname);
  for (var i = 0; i < posts.length; i++) {
    const storedTitle = _.lowerCase(posts[i].title);
    if (posttitle === storedTitle) {
      console.log("Match found");
    }
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
