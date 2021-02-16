const express = require('express');
const fs = require('fs');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/', upload.single('media'), (req, res) => {
  res.end(); // レスポンス
  // postで受信
  fs.writeFileSync(`./upload/${new Date().getTime()}.webm`, req.file.buffer);　// 保存
});

app.listen(8080, () => console.log(':8080'));
