'use strict';


let parseRss2 = (entrys) => {
    entrys.map(function(entry){
        let title = entry.title[0],
            link = entry.link[0],
            content = entry.description[0],
            time = entry.pubDate[0],
            author;

        
        if ( entry['dc:creator'] ) {
            author = entry['dc:creator'][0];
        } else if ( entry.author ) {
            author = entry.author[0];
        }

        console.log("author = ", author);
        console.log("time = ", time);
        console.log("content = ", content);
        console.log("link = ", link);
        console.log("title = ", title);
    });
};

let parseAtom = (entrys) => {

    entrys.map(function(entry){
        console.log(entry);
        let title = entry.title[0]._ || entry.title[0],
            link = entry.link[0].$.href,
            content,
            time ,
            author;

        if ( entry.content ) {
            content = entry.content[0]._;
        } else if ( entry.summary ) {
            content = entry.summary[0]._;
        }

        if ( entry.published ) {
            time = entry.published[0];
        } else if ( entry.updated ) {
            time = entry.updated[0];
        }

        if ( entry.author ) {
            author = entry.author[0].name[0];
        }



        
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
        if ( feed.rss.channel ) {
            parseRss2(feed.rss.channel[0].item);
        } 



        
    } else if ( feed.feed.entry ) {
        parseAtom(feed.feed.entry);
    }

};



module.exports = {
    parse
};
