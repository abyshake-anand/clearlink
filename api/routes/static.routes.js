const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => { return res.status(200).json({ message: "Hello World from static routes api endpoint" }) });

router.get("/sitemap.xml", async (req, res) => {
    // render a sample sitemap page
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString());
    res.setHeader("Last-Modified", new Date(Date.now() - 86400 * 1000).toUTCString());
    res.setHeader("ETag", "sitemap.xml");
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.gcf-lcm.com/</loc>
            <lastmod>2021-05-04T00:00:00+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://www.gcf-lcm.com/about</loc>
            <lastmod>2021-05-04T00:00:00+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://www.gcf-lcm.com/contact</loc>
            <lastmod>2021-05-04T00:00:00+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://www.gcf-lcm.com/privacy-policy</loc>
            <lastmod>2021-05-04T00:00:00+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://www.gcf-lcm.com/terms-of-service</loc>
            <lastmod>2021-05-04T00:00:00+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    </urlset>`;
    res.send(sitemap);
});

router.get("/rss/feed.xml", async (req, res) => {
    // render a sample rss feed page
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString());
    res.setHeader("Last-Modified", new Date(Date.now() - 86400 * 1000).toUTCString());
    res.setHeader("ETag", "feed.xml");
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>GCF and LCM Calculator</title>
            <link>https://www.gcf-lcm.com/</link>
            <description>GCF and LCM Calculator</description>
            <language>en-us</language>
            <lastBuildDate>Mon, 03 May 2021 00:00:00 +0000</lastBuildDate>
            <item>
                <title>GCF and LCM Calculator</title>
                <link>https://www.gcf-lcm.com/</link>
                <description>GCF and LCM Calculator</description>
                <pubDate>Mon, 03 May 2021 00:00:00 +0000</pubDate>
                <guid>https://www.gcf-lcm.com/</guid>
            </item>
        </channel>
    </rss>`;
    res.send(feed);
});

module.exports = router;