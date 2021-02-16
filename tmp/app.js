const express = require('express');
const path = require('path');
const multer = require('multer')
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname)));

let storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'id', maxCount: 1 }]), async (req, res) => {
  res.end();
  fs.writeFileSync(`${req.files.id[0].buffer.toString()}.webm`, req.files.file[0].buffer);
});

app.listen(8080);