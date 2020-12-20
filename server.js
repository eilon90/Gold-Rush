const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const PORT = 3000;
app.listen(process.env.PORT || PORT, function() {
    console.log(`Running`);
})