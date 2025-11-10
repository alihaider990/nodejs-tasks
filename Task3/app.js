console.log(`your current node version is ${process.version}`);
console.log(`your current directory is ${process.cwd()}`);

console.log(__filename);
console.log(__dirname);

const argv = process.argv[2];

console.log(`hello ${argv}`);


