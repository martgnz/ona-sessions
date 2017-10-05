const fs = require("fs");
const ScrapeONA = require("./scrapers/latest");
const ScrapeONA12 = require("./scrapers/ona12");

// ScrapeONA("https://ona17.journalists.org/sessions/", "2017").then(data =>
//   fs.writeFile("data/ona17.json", JSON.stringify(data), function(err) {
//     console.log("ONA17 successfully written 👌");
//   })
// );

// ScrapeONA("https://ona16.journalists.org/sessions/", "2016").then(data =>
//   fs.writeFile("data/ona16.json", JSON.stringify(data), function(err) {
//     console.log("ONA16 successfully written 👌");
//   })
// );
//
// ScrapeONA("https://ona15.journalists.org/sessions/", "2015").then(data =>
//   fs.writeFile("data/ona15.json", JSON.stringify(data), function(err) {
//     console.log("ONA15 successfully written 👌");
//   })
// );
//
// ScrapeONA("https://ona14.journalists.org/sessions/", "2014").then(data =>
//   fs.writeFile("data/ona14.json", JSON.stringify(data), function(err) {
//     console.log("ONA14 successfully written 👌");
//   })
// );
// ScrapeONA("https://ona13.journalists.org/sessions/", "2013").then(data =>
//   fs.writeFile("data/ona13.json", JSON.stringify(data), function(err) {
//     console.log("ONA13 successfully written 👌");
//   })
// );
//

ScrapeONA12("https://ona12.journalists.org/sessions/", "2012").then(data =>
  fs.writeFile("data/ona12.json", JSON.stringify(data), function(err) {
    console.log("ONA12 successfully written 👌");
  })
);
