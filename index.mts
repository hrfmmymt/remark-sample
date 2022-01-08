import * as fs from 'fs';
import { unified } from 'unified';
import { read } from 'to-vfile';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const SRC_PATH = './src/';
const DIST_PATH = './dist/';

async function main(inputMdFile: string, fileName: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(await read(SRC_PATH + inputMdFile));

  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);

  const outputFilePath = `${DIST_PATH}${fileName}.html`;

  fs.writeFile(outputFilePath, String(file), 'utf-8', (err) => {
    err ? console.error(err) : console.log(`${outputFilePath}\n${String(file)}\n`);
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
