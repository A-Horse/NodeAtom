'use strict';


let parseRss = (entrys) => {
    entrys.map(function(entry){
        let title = entry.title[0],
            link = entry.link[0],
            content = entry.description[0],
            time = entry.pubDate[0],
        author = entry.author[0];
        console.log("author = ", author);
        console.log("time = ", time);
        console.log("content = ", content);
        console.log("link = ", link);
        console.log("title = ", title);
    });
};


let parse = (feed) => {
    console.log(feed);
    if ( feed.rss  ) {
        parseRss(feed.rss.channel[0].item);
    }

};



module.exports = {
    parse
};
