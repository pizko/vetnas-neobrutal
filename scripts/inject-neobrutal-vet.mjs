import { readdir, readFile, writeFile } from "node:fs/promises";

const link = '  <link rel="stylesheet" href="neobrutal-vet.css">\n';
const files = (await readdir(".")).filter((file) => file.endsWith(".html"));
let updated = 0;

for (const file of files) {
  const source = await readFile(file, "utf8");
  if (!source.includes("</head>")) throw new Error(`Missing head: ${file}`);
  if (source.includes('href="neobrutal-vet.css"')) continue;
  await writeFile(file, source.replace("</head>", `${link}</head>`));
  updated += 1;
}

console.log(`Updated ${updated} HTML files.`);
