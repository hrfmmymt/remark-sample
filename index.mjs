import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const INPUT = 'input';
const OUTPUT = 'output';
const SRC_PATH = './src/';
const DIST_PATH = './dist/';

(async () => {
  const inputMdFile = fs.readFileSync(`${SRC_PATH}${INPUT}.md`, 'utf-8', (err) => {
    if (err) throw err;
  });

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(inputMdFile);

  fs.writeFile(`${DIST_PATH}${OUTPUT}.html`, String(file), 'utf-8', (err) => {
    err ? console.error(err) : console.log(String(file));
  });
})();
