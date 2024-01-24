const express = require('express'); const router = express.Router();
const fs = require("fs-extra");
const path = require("path");

router.get('/', async (req, res) => { return res.status(200).json({ message: "Hello World" }) });
router.get('/hello', async (req, res) => {
    const dir_path = path.join(path.resolve(__dirname), "..", "..", "assets", "static", "hello");
    const files = fs.readdirSync(dir_path);
    return res.status(200).json({ message: "Hello World from a new route", files: files })
});
router.get("/get-all-images", async (req, res) => {
    const dir_path = path.join(path.resolve(__dirname), "..", "..", "assets", "static");
    // read all files in the directory, including files in subdirectories and their subdirectories
    const files = fs.readdirSync(dir_path, { withFileTypes: true }).flatMap((dirent) => {
        const res = [];
        if (dirent.isFile()) {
            res.push(dirent.name);
        } else if (dirent.isDirectory()) {
            const subDirPath = path.join(dir_path, dirent.name);
            const subDirFiles = fs.readdirSync(subDirPath).map((fileName) => path.join(dirent.name, fileName));
            res.push(...subDirFiles);
        }
        return res.filter((fileName) => fileName.endsWith(".webp"));
    });
    return res.status(200).json({
        image_file_locations: files
    })
});

module.exports = router;