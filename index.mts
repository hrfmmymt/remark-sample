import fs from 'fs';
// import * as fs from 'fs';
import { read } from 'to-vfile';
import { remark } from 'remark';
import html from 'remark-html';

const SRC_PATH = './src/';
const DIST_PATH = './dist/';

async function main(inputMdFile: string, fileName: string) {
  const result = await remark()
    .use(html, {sanitize: false})
    .process(await read(SRC_PATH + inputMdFile));

  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);

  const outputFilePath = `${DIST_PATH}${fileName}.html`;

  fs.writeFile(outputFilePath, String(result), 'utf-8', (err) => {
    err ? console.error(err) : console.log(`${outputFilePath}\n${String(result)}\n`);
  });
}

const mdToHtml = () => {
  fs.readdir(SRC_PATH, (err, mdFiles) => {
    if (err) {
      console.log(err);
    }

    for(const mdFile of mdFiles) {
      const fileName = mdFile.replace(/.md/g, '');

      main(mdFile, fileName);
    }
  });
};

mdToHtml();
