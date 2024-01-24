const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs-extra");
const path = require("path");

async function scrapeWebsite(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const htmlContent = await page.content();
    await browser.close();
    return htmlContent;
}

function extractTableData(htmlContent) {
    const $ = cheerio.load(htmlContent);

    // Select the table and iterate through each row in the tbody
    const tableRows = $('table.table tbody tr');

    const tableData = [];

    tableRows.each((index, row) => {
        const columns = $(row).find('td');
        const rowData = {
            id: columns.eq(0).text(),
            firstName: columns.eq(1).find('h6').text(),
            lastName: columns.eq(2).find('h6').text(),
            email: columns.eq(3).find('h6').text(),
            dateTime: columns.eq(4).text(),
            status: columns.eq(5).text(),
            actionLink: columns.eq(6).find('a').attr('href'),
        };

        tableData.push(rowData);
    });

    return tableData;
}

async function main() {
    const start_page = 2279;
    // const end_page = 2;
    const end_page = 3749;
    const file_path = path.join(path.resolve(__dirname), "data", "instafeed.json");
    if (!fs.existsSync(file_path)) { fs.ensureFileSync(file_path); }
    const websiteUrl = 'https://www.instafeed.org/admin/users?page=';
    for (let i = start_page; i <= end_page; i++) {
        const htmlContent = await scrapeWebsite(websiteUrl + i);
        const tableData = extractTableData(htmlContent);
        const currentData = JSON.parse(fs.readFileSync(file_path, 'utf8'));

        currentData.push(...tableData);

        fs.writeFileSync(file_path, JSON.stringify(currentData, null, 4));

        console.log(`Page ${i} done`);

        await sleep(5000);
    }

}

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

main();