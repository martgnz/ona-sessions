const osmosis = require("osmosis");

const ScrapeONA = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".session-list a")
      .set({ link: "@href" })
      .follow("@href")
      .find(edition === "2015" ? ".post-title" : ".entry-title")
      .set("session")
      .find(
        edition === "2013"
          ? ".session-meta .track + li"
          : ".session-meta .track + li a"
      )
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
};

module.exports = ScrapeONA;
