const osmosis = require("osmosis");

const ScrapeONA11 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".session-title > a")
      .set("session")
      .data(d => {
        d.edition = edition;
        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA11;
