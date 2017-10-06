const osmosis = require("osmosis");

const ScrapeONA09 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      // .find(".schedule .schedule_cell:nth-child(1) strong:first-child")
      // .set("day")
      // .find(".schedule .schedule_cell:nth-child(2) strong:first-child")
      // .set("hours")
      .find(".schedule .schedule_cell:nth-child(3) strong:first-child")
      .set("session")
      .data(d => {
        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA09;
