const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());

let Parser = require('rss-parser');
let parser = new Parser();

async function fetchRssFeed(feedUrl) {
    let feed = await parser.parseURL(feedUrl);
    console.log(feed)
    return feed.items.map(item => {
        console.log(item.title)
        console.log(item.link)
        console.log(item.pubDate)
        return {
            title: item.title,
            link: item.link,
            date: item.pubDate,
            content: item.contentSnippet
        }
    });
}
const bitcoinFeedUrl = 'https://www.lianatech.com/resources/blog.rss'

app.get('/', async (req, res) => {
    await fetchRssFeed(bitcoinFeedUrl)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})