const fs = require("fs");
const osmosis = require("osmosis");

function scrapeONA(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".session-list a")
      .set({ link: "@href" })
      .follow("@href")
      .find(".entry-title")
      .set("session")
      .find(".session-meta .track + li a")
      .set("track")
      .filter("node():not(:contains('All sessions →'))")
      .find(".day")
      .set("date")
      .find(".room")
      .set("location")
      .find(".hash a")
      .set("hashtag")
      .data(d => {
        d.edition = edition;
        d.day = d.date.split(/[-–]/)[0].trim();
        d.hours = [d.date.split(/[-–]/)[1], d.date.split(/[-–]/)[2]].map(v =>
          v.trim()
        );

        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
}

scrapeONA("https://ona17.journalists.org/sessions/", "2017").then(data =>
  fs.writeFile("data/ona17.json", JSON.stringify(data), function(err) {
    console.log("ONA17 successfully written 👌");
  })
);

scrapeONA("https://ona16.journalists.org/sessions/", "2016").then(data =>
  fs.writeFile("data/ona16.json", JSON.stringify(data), function(err) {
    console.log("ONA16 successfully written 👌");
  })
);
