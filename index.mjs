import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const SRC_PATH = './src/';
const DIST_PATH = './dist/';

async function main(inputMdFile, fileName) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(inputMdFile);
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
      const filePath = SRC_PATH + mdFile;
      const fileName = mdFile.replace(/.md/g, '');

      const inputMdFile = fs.readFileSync(filePath, 'utf8', (err) => {
        if (err) throw err;
      });

      main(inputMdFile, fileName);
    }
  });
};

mdToHtml();
