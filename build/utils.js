import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(import.meta.url) // 当前目录路径

export const projectRoot = path.resolve(__dirname, '../../')
export const srcRoot = path.resolve(projectRoot, './src')

