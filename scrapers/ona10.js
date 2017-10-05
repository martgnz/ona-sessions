const osmosis = require("osmosis");

const ScrapeONA10 = function(url, edition) {
  return new Promise((resolve, reject) => {
    let sessions = [];

    osmosis
      .get(url)
      .find(".event a")
      .set({ link: "@href" })
      .follow("@href")
      .find(".name")
      .set("session")
      .find(".sched-event-type a:last-child")
      .set("track")
      .find(".sched-event-details-timeandplace")
      .set("date")
      .find(".sched-event-details-timeandplace a")
      .set("location")
      .find(".tip-description p:last-child strong")
      .set("hashtag")
      .data(d => {
        d.edition = edition;
        d.link = `https://ona2010.sched.com${d.link}`;
        d.date = d.date.split(/\n/)[0];
        d.day = d.date.split(" ")[0];
        d.hours = [
          d.date.split(" ")[5],
          d.date
            .split(" ")
            .slice(-1)
            .pop()
        ];
        d.hashtag = d.hashtag.split(" ")[1];

        sessions.push(d);
      })
      .done(() => resolve(sessions));
  });
};

module.exports = ScrapeONA10;
