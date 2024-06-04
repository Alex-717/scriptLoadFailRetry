
import express from 'express'

import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url)

const app = express();
const port = 3000;

// 设置静态资源目录
app.use(express.static(path.resolve(__dirname, '../../public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});