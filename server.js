const recog = require('./recog');
const fs = require('fs');
const express = require('express');
const Multer = require('multer');
const cors = require('cors');
const formidable = require('formidable');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/recog', multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // Create a new blob in the bucket and upload the file data.
    // const blob = bucket.file(req.file.originalname);

    console.log(req.file);

    recog.recognize(req.file.buffer, function (text) {
        res.json({ "transcript": text });
        console.log('transcricao enviada!');
    });
});

// create a GET route
app.post('/recog2', (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req).on('file', (name, file) => {
        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');
        console.log(file.path);

        recog.recognize(file.path, function (text) {
            res.json({ "transcript": text });
            console.log('transcricao enviada!');
        });
        // fs.readFile(file.path, function(err, data){
        // });
    });
});

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});