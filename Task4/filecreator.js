const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const filename = args[0];
const content = args.slice(1).join(' ');

if (!filename || !content) {
    console.log("Usage: node fileCreator.js <fileName> <content>");
    process.exit(1);
}


fs.writeFileSync(filename, content);
console.log(`File "${filename}" created successfully.`);


const data = fs.readFileSync(filename, "utf8");
console.log(`File content:\n${data}`);
