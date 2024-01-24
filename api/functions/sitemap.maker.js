const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

const static_directory_path = path.join(__dirname, "..", "..", "static");
const sitemap_directory_path = path.join(static_directory_path, "sitemaps");

const sitemap_index_file_path = path.join(static_directory_path, "sitemap-index.xml");

const sitemap_index_template = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{{ sitemaps }}
</sitemapindex>
`;

const sitemap_index_url_template = `<sitemap>
    <loc>{{ url }}</loc>
    <lastmod>{{ lastmod }}</lastmod>
</sitemap>
`;

if (!fs.existsSync(sitemap_directory_path)) {
    fs.mkdirSync(sitemap_directory_path, { recursive: true });
}

if (!fs.existsSync(sitemap_index_file_path)) {
    fs.writeFileSync(sitemap_index_file_path, sitemap_index_template.replace("{{ sitemaps }}", ""));
}

const sitemap_template = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">{{urls}}</urlset>
`;

const sitemap_url_template = `<url>
    <loc>{{url}}</loc>
    <lastmod>{{lastmod}}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
</url>
`;

const test_input_file = path.join(path.resolve(__dirname), "..", "..", "inc", "numbers.json");

async function main() {
    const numbers = fs.readFileSync(test_input_file, "utf-8");
    const numbers_json = JSON.parse(numbers);
    // add gcf-of-x-y and lcm-of-x-y to sitemap-1.xml
    const sitemap_1_file_path = path.join(sitemap_directory_path, "sitemap-1.xml");

    if (!fs.existsSync(sitemap_1_file_path)) {
        fs.writeFileSync(sitemap_1_file_path, sitemap_template.replace("{{urls}}", ""));
    }

    const sitemap_index = fs.readFileSync(sitemap_index_file_path, "utf-8");
    const sitemap_index_xml = sitemap_index.replace("</sitemapindex>", `${sitemap_index_url_template.replace("{{ url }}", "https://gcf-lcm.vercel.app/sitemaps/sitemap-1.xml").replace("{{ lastmod }}", moment().format())}</sitemapindex>`);
    fs.writeFileSync(sitemap_index_file_path, sitemap_index_xml);

    for (let i = 0; i < numbers_json.length; i++) {
        const number_array = numbers_json[i];
        const gcf_url = `https://gcf-lcm.vercel.app/gcf-of-${number_array.join("-").replace(/-([^-]*)$/, "-and-$1")}`;
        const lcm_url = `https://gcf-lcm.vercel.app/lcm-of-${number_array.join("-").replace(/-([^-]*)$/, "-and-$1")}`;

        const random_number_of_hours_between_0_and_500_for_gcf = Math.floor(Math.random() * 500);
        const random_number_of_minutes_between_0_and_59_for_gcf = Math.floor(Math.random() * 59);

        const random_number_of_hours_between_0_and_500_for_lcm = Math.floor(Math.random() * 500);
        const random_number_of_minutes_between_0_and_59_for_lcm = Math.floor(Math.random() * 59);

        const gcf_lastmod = moment().subtract(random_number_of_hours_between_0_and_500_for_gcf, "hours").subtract(random_number_of_minutes_between_0_and_59_for_gcf, "minutes").format();

        const lcm_lastmod = moment().subtract(random_number_of_hours_between_0_and_500_for_lcm, "hours").subtract(random_number_of_minutes_between_0_and_59_for_lcm, "minutes").format();

        const gcf_url_xml = sitemap_url_template.replace("{{url}}", gcf_url).replace("{{lastmod}}", gcf_lastmod);
        const lcm_url_xml = sitemap_url_template.replace("{{url}}", lcm_url).replace("{{lastmod}}", lcm_lastmod);

        const sitemap_1 = fs.readFileSync(sitemap_1_file_path, "utf-8");
        const sitemap_1_xml = sitemap_1.replace("</urlset>", `${gcf_url_xml}${lcm_url_xml}</urlset>`);
        fs.writeFileSync(sitemap_1_file_path, sitemap_1_xml);
    }
}

main();