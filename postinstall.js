import fse from 'fs-extra';
import path from 'path';

const topDir = process.cwd(); 

const publicTinymceDir = path.join(topDir, 'public', 'tinymce');
const nodeModulesTinymceDir = path.join(topDir, 'node_modules', 'tinymce');

fse.emptyDirSync(publicTinymceDir);
fse.copySync(nodeModulesTinymceDir, publicTinymceDir, { overwrite: true });
