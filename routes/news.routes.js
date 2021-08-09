const express = require('express');
const fetch = require('isomorphic-fetch');
const router = express.Router();
const RSS_URL = `http://feeds.bbci.co.uk/news/rss.xml`
router.get('/news', (req, res) => {
    fetch(RSS_URL)
    .then(response => response.text())
    // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => res.send(data))
    
})

module.exports = router;
