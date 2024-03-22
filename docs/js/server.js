const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;

    fs.appendFile('guestbook.tsv', '- ' + comment + '\n', (err) => {
        if (err) throw err;
        console.log('Comment saved: ' + comment);
    });

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
