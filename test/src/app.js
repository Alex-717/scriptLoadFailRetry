
import express from 'express'
import { testRoot } from '../../utils/path.js'
import path from 'path'

const PORT = 3000;
const app = express();


// 设置静态资源目录
app.use(express.static(path.resolve(testRoot, './public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});