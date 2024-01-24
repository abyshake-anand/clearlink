const express = require('express'); const router = express.Router();
const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");

router.get('/', async (req, res) => { return res.status(200).json({ message: "Hello World from image display API endpoint" }) });
router.get("/medium/:image_name", async (req, res) => {
    try {
        const image_name = req.params.image_name;
        const image_url = `https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-The%20lcm%20of%205%20and%204%20is%2020,fs-120,ia-center,pa-10,ly-350,w-1200,tg-bold,l-end:l-text,i-What%20is%20the%20LCM%20of%205%20and%204%3F%20is%20the%20LCM%20of%205%20and%204%3F,lx-1620,ly-900,fs-35,tg-bold,ia-left,w-500,l-end:w-1200,f-png/social-frame-new.png`;
        const image_response = await fetch(image_url);
        const image_buffer = await image_response.buffer();
        const image_content_type = image_response.headers.get("content-type");
        res.setHeader("Content-Type", image_content_type);
        // res.setHeader("Cache-Control", "public, max-age=86400");
        // res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString());
        // res.setHeader("Last-Modified", new Date(Date.now() - 86400 * 1000).toUTCString());
        // res.setHeader("ETag", image_name);
        res.send(image_buffer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.get("/:image_folder/:image_name", async (req, res) => {
    const dir_path = path.join(path.resolve(__dirname), "..", "..", "assets", "static");
    const image_folder = req.params.image_folder;
    const image_name = req.params.image_name;
    const image_path = path.join(dir_path, image_folder, image_name);

    if (!fs.existsSync(image_path)) {
        const image_type = image_folder.match(/(featured|thumbnail|pin)/)[0];
        const gcf_or_lcm = image_folder.match(/(gcf|lcm)/)[0];
        const numbers = image_name.match(/(\d+)/g);
        const numbers_array = numbers.map(number => parseInt(number));
        const image_download_url = url_for_imagekit_image(image_type, numbers_array, gcf_or_lcm);
        const image_response = await fetch(image_download_url);
        const image_buffer = await image_response.buffer();
        res.setHeader("Content-Type", "image/webp");
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString());
        res.setHeader("Last-Modified", new Date(Date.now() - 86400 * 1000).toUTCString());
        res.setHeader("ETag", image_name);
        res.send(image_buffer);
    } else {
        res.setHeader("Content-Type", "image/webp");
        res.setHeader("Cache-Control", "public, max-age=86400");
        res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString());
        res.setHeader("Last-Modified", new Date(Date.now() - 86400 * 1000).toUTCString());
        res.setHeader("ETag", image_name);
    
        res.sendFile(image_path);
    }
});

module.exports = router;

/*
Featured Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-The%20lcm%20of%205%20and%204%20is%2020,fs-120,ia-center,pa-10,ly-350,w-1200,tg-bold,l-end:l-text,i-What%20is%20the%20LCM%20of%205%20and%204%3F%20is%20the%20LCM%20of%205%20and%204%3F,lx-1620,ly-900,fs-35,tg-bold,ia-left,w-500,l-end:w-1200/social-frame-new.png


Thumbnail Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-18000,ly-100,w-600,ia-center,fs-150,tg-bold,l-end:l-text,i-is%0Athe%20LCM%20of%205%2C%204%20and%2020,fs-60,tg-bold,w-600,pa-0_30,ly-300,l-end/post-thumbnail.png

Pin Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-${first_text_block},fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:l-text,i-${url_encoded_second_text_block},pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png
*/

function calculate_gcf(a, b) {
    return b === 0 ? a : calculate_gcf(b, a % b);
}

function calculate_lcm(a, b) {
    return (a * b) / calculate_gcf(a, b);
}

function calculate_lcm_of_array(numbers_array) {
    if (!Array.isArray(numbers_array) || numbers_array.length === 0) {
        return null; // Invalid input
    }
    let result = numbers_array[0];
    for (let i = 1; i < numbers_array.length; i++) {
        result = calculate_lcm(result, numbers_array[i]);
    }
    return result;
}

function calculate_gcf_of_array(numbers_array) {
    if (!Array.isArray(numbers_array) || numbers_array.length === 0) {
        return null; // Invalid input
    }
    let result = numbers_array[0];
    for (let i = 1; i < numbers_array.length; i++) {
        result = calculate_gcf(result, numbers_array[i]);
    }
    return result;
}

function url_for_imagekit_image(image_type, numbers_array, gcf_or_lcm) {
    var url = "";
    switch(image_type) {
        case "featured":
            url = "https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-{{first_text_block}},fs-120,ia-center,pa-10,ly-350,w-1200,tg-bold,l-end:l-text,i-{{second_text_block}},lx-1620,ly-900,fs-35,tg-bold,ia-left,w-500,l-end:w-1200/social-frame-new.png"
            break;
        case "thumbnail":
            url = "https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-{{first_text_block}},ly-100,w-600,ia-center,fs-150,tg-bold,l-end:l-text,i-{{second_text_block}},fs-60,tg-bold,w-600,pa-0_30,ly-300,l-end/post-thumbnail.png"
            break;
        case "pin":
            url = "https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-{{first_text_block}},fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:l-text,i-{{second_text_block}},pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png"
            break;
        default:
            return null;
    }
    const gcf = calculate_gcf_of_array(numbers_array);
    const lcm = calculate_lcm_of_array(numbers_array);
    var first_text_block = "";
    var second_text_block = "";

    if (image_type === "featured") {
        first_text_block = `The ${gcf_or_lcm.toUpperCase()} of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")} is ${gcf_or_lcm === "gcf" ? gcf : lcm}`;
        second_text_block = `What is the ${gcf_or_lcm.toUpperCase()} of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")}?`;
    } else if (image_type === "thumbnail") {
        first_text_block = `${gcf_or_lcm === "gcf" ? gcf : lcm}`;
        second_text_block = `is the ${gcf_or_lcm.toUpperCase()} of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")}`;
    } else if (image_type === "pin") {
        first_text_block = `${gcf_or_lcm === "gcf" ? gcf : lcm}`;
        second_text_block = `What is the ${gcf_or_lcm.toUpperCase()} of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")}?`;
    }

    first_text_block = encodeURIComponent(first_text_block);
    second_text_block = encodeURIComponent(second_text_block);

    url = url.replace("{{first_text_block}}", first_text_block);
    url = url.replace("{{second_text_block}}", second_text_block);

    return url;
}