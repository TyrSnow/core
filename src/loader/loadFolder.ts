import * as fs from 'fs';
import * as path from 'path';

function generateFilter(includes?: string[], ignores?: string[]) {
  return (path) => {
    return true;
  };
}

export default function loadFolder(folder: string, includes?: string[], ignores?: string[]) {
  const paths = fs.readdirSync(folder);

  return paths.filter(generateFilter(includes, ignores)).map((fileName: string) => {
    const ext = path.extname(fileName);
    const file = fileName.replace(ext, '');
    const filePath = path.join(process.cwd(), folder, fileName);

    return require(filePath).default;
  });
}