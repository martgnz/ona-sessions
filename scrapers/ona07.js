const osmosis = require("osmosis");
const _ = require("lodash");

const ScrapeONA07 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".article p a")
      .set({ link: "@href" })
      .set("title")
      .data(d => {
        d.edition = edition;
        sessions.push(d);
      })
      .done(() => {
        resolve(sessions);
      });
  });
};

module.exports = ScrapeONA07;
