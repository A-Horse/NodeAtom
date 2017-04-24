'use strict';
let db = require('./db');
var moment = require('moment');


let parseRss2 = (entrys, tags) => {
  entrys.map(function(entry) {
    let title = entry.title[0],
        link = entry.link[0],
        content = entry.description[0],
        time = moment(entry.pubDate[0]).format('MM-DD, hh:mm'),
        author;


    if (entry['dc:creator']) {
      author = entry['dc:creator'][0];
    } else if (entry.author) {
      author = entry.author[0];
    }

    db.insertAtom({
      author: author,
      date: time,
      content: content,
      link: link,
      title: title
    }, tags);
  });
};

let parseAtom = (entrys, tags) => {

  entrys.map(function(entry) {

    let title = entry.title[0]._ || entry.title[0],
        link = entry.link[0].$.href,
        content,
        time,
        author;

    if (entry.content) {
      content = entry.content[0]._;
    } else if (entry.summary) {
      content = entry.summary[0]._;
    }

    if (entry.published) {
      time = entry.published[0];
    } else if (entry.updated) {
      time = entry.updated[0];
    }

    time = moment(time).format('MM-DD, hh:mm');

    if (entry.author) {
      author = entry.author[0].name[0];
    }

    db.insertAtom({
      author: author,
      date: time,
      content: content,
      link: link,
      title: title
    }, tags);
  });
};

let parse = (feed, tags) => {
  try {
    if (feed.rss) {
      if (feed.rss.channel) {
        return parseRss2(feed.rss.channel[0].item, tags);
      }

    } else if (feed.feed.entry) {
      return parseAtom(feed.feed.entry, tags);
    }
  } catch(e) {

  }
};



module.exports = {
  parse
};
