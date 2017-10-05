const osmosis = require("osmosis");

const ScrapeONA09 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".event a")
      .data(d => {
        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA09;
