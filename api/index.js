const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsconfig = { accessControlAllowOrigin: '*' };
const app = express();
app.use(cors(corsconfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use((req, res, next) => { req.setTimeout(0); res.setTimeout(0); next(); });

app.use("/images", require("./routes/images"));
app.use("/img", require("./routes/img.display"));
app.use("/files", require("./routes/static.routes"));

module.exports = { path: '/api', handler: app }