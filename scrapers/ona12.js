const osmosis = require("osmosis");

const ScrapeONA12 = function(url, postSelector, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".session-list a")
      .set({ link: "@href" })
      .follow("@href")
      .find(".post-title")
      .set("session")
      .find(".session-navigation a:nth-child(2)")
      .set("track")
      .find(".session-details li:first-child")
      .set("day")
      .find(".session-details li:nth-child(2)")
      .set("hour")
      .find(".session-details li:nth-child(3)")
      .set("location")
      .find(".session-details li:nth-child(4)")
      .set("hashtag")
      .data(d => {
        d.edition = edition;
        d.date = `${d.day} - ${d.hour}`;

        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA12;
