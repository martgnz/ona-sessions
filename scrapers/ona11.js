const osmosis = require("osmosis");

const ScrapeONA11 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".session-location a")
      .set("location")
      .find(".session-type a")
      .set("track")
      .find(".session-title a")
      .set({ link: "@href" })
      .follow("@href")
      .find(".session-title")
      .set("session")
      .find(".session-when")
      .set("date")
      .filter("node():not(:contains('When:'))")
      .find(".session-where")
      .set("location")
      .filter("node():not(:contains('Where:'))")
      .data(d => {
        d.edition = edition;
        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA11;
