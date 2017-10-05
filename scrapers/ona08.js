const osmosis = require("osmosis");
const _ = require("lodash");

const ScrapeONA08 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".article p:not(:first-child)")
      .set("content")
      .filter("node():not(:contains(' '))")
      .data(d => {
        d.edition = edition;
        d.content = d.content.split(/\n/);
        d.session = d.content[1];
        d.hours = [d.content[0].split("-")[0], d.content[0].split("-")[1]];
        d.location = _.filter(d.content, s => s.indexOf("Location") !== -1)
          .toString()
          .split(": ")[1];

        d.track = _.filter(d.content, s => s.indexOf("Track") !== -1)
          .toString()
          .split(": ")[1];

        delete d.content;
        sessions.push(d);
      })
      .done(() => {
        sessions.splice(2, 1);
        sessions.splice(9, 1);
        sessions.splice(39, 1);
        sessions[25].location = "South America Room";

        resolve(sessions);
      });
  });
};

module.exports = ScrapeONA08;
