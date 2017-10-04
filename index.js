const fs = require("fs");
const d3 = require("d3");
const jsdom = require("jsdom/lib/old-api.js");

const url =
  "https://ona17.journalists.org/track/audience-engagement-analytics/";

jsdom.env(url, function(error, window) {
  if (error) throw error;
  const page = d3.select(window.document);

  var sessions = [];

  page.selectAll(".single-session").each(function() {
    var el = d3.select(this);

    sessions.push({
      title: el.select(".session-title").text(),
      location: el
        .select(".meta")
        .text()
        .split("|")[0],
      hashtag: el
        .select(".meta")
        .text()
        .split("|")[1],
      categories: ["audience", "engagement", "analytics"]
    });
  });

  fs.writeFile("output.json", JSON.stringify(sessions), function(err) {
    console.log("File successfully written 👌");
  });
});
