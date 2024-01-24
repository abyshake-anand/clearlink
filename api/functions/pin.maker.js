const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const fetch = require("node-fetch");

// https://ik.imagekit.io/0hzz98pycj/gcf-lcm/
// tr:l-text,i-20,fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:
// l-text,i-LCM%20of%205%20and%204%20is%2020,pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png

const static_directory_path = path.join(__dirname, "..", "..", "static");
const pins_directory_path = path.join(static_directory_path, "pins");

const test_input_file = path.join(path.resolve(__dirname), "..", "..", "inc", "numbers.json");

async function main() {
    const numbers = fs.readFileSync(test_input_file, "utf-8");
    const numbers_json = JSON.parse(numbers);
    for (let i = 0; i < numbers_json.length; i++) {
        console.log(`Making pin for item ${ i + 1 } of ${numbers_json.length}`)
        const numbers_array = numbers_json[i];
        // await make_pin_image(numbers_array);
        await make_pin_image_for_gcf(numbers_array);
    }
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function calculateLCM(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null; // Invalid input
    }

    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }

    return result;
}

function calculateGCF(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null; // Invalid input
    }

    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        result = gcd(result, numbers[i]);
    }

    return result;
}

async function make_pin_image(numbers_array) {
    const lcm = await calculateLCM(numbers_array);
    
    const first_text_block = lcm;
    const second_text_block = `What is the LCM of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")}?`;
    const url_encoded_second_text_block = encodeURIComponent(second_text_block);
    const image_kit_url = `https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-${first_text_block},fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:l-text,i-${url_encoded_second_text_block},pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png`;
    const response = await fetch(image_kit_url);
    const buffer = await response.buffer();
    const file_name = `lcm-of-${numbers_array.join("-").replace(/-([^-]*)$/, "-and-$1")}.webp`;
    await sharp(buffer).webp({ quality: 70 }).toFile(path.join(pins_directory_path, file_name));
    console.log("Image saved to file");
}

async function make_pin_image_for_gcf(numbers_array) {
    const gcf = await calculateGCF(numbers_array);

    const first_text_block = gcf;
    const second_text_block = `What is the GCF of ${numbers_array.join(", ").replace(/,([^,]*)$/, " and$1")}?`;
    const url_encoded_second_text_block = encodeURIComponent(second_text_block);
    const image_kit_url = `https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-${first_text_block},fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:l-text,i-${url_encoded_second_text_block},pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png`;
    const response = await fetch(image_kit_url);
    const buffer = await response.buffer();
    const file_name = `gcf-of-${numbers_array.join("-").replace(/-([^-]*)$/, "-and-$1")}.webp`;
    await sharp(buffer).webp({ quality: 70 }).toFile(path.join(pins_directory_path, file_name));
    console.log("Image saved to file");
}

// make_pin_image();

main();


/*
Featured Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-The%20lcm%20of%205%20and%204%20is%2020,fs-120,ia-center,pa-10,ly-350,w-1200,tg-bold,l-end:l-text,i-What%20is%20the%20LCM%20of%205%20and%204%3F%20is%20the%20LCM%20of%205%20and%204%3F,lx-1620,ly-900,fs-35,tg-bold,ia-left,w-500,l-end:w-1200/social-frame-new.png


Thumbnail Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-18000,ly-100,w-600,ia-center,fs-150,tg-bold,l-end:l-text,i-is%0Athe%20LCM%20of%205%2C%204%20and%2020,fs-60,tg-bold,w-600,pa-0_30,ly-300,l-end/post-thumbnail.png

Pin Image:
https://ik.imagekit.io/0hzz98pycj/gcf-lcm/tr:l-text,i-${first_text_block},fs-250,ia-center,pa-10,ly-200,w-1000,tg-bold,l-end:l-text,i-${url_encoded_second_text_block},pa-60,ly-550,fs-100,tg-bold,ia-center,w-1000,bg-FFFFFF75,l-end/base-image.png
*/