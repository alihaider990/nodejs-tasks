const fs = require("fs");

function loadStudents() {
    try {
        return JSON.parse(fs.readFileSync("students.json", "utf8"));
    } catch {
        return [];
    }
}

function saveStudents(students) {
    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
}

function addStudent(name, age, city) {
    const students = loadStudents();
    students.push({ name, age, city });
    saveStudents(students);
    console.log(` Added: ${name}`);
}

function listStudents() {
    const students = loadStudents();
    console.table(students);
}

function removeStudent(name) {
    const students = loadStudents();
    const updated = students.filter(s => s.name !== name);
    saveStudents(updated);
    console.log(` RemoveD: ${name}`);
}

function searchStudent(name) {
    const students = loadStudents();
    const result = students.filter(s => s.name === name);
    console.table(result);
}

const command = process.argv[2];
const name = process.argv[3];
const age = process.argv[4];
const city = process.argv[5];

if (command === "add") addStudent(name, age, city);
else if (command === "list") listStudents();
else if (command === "remove") removeStudent(name);
else if (command === "search") searchStudent(name);
else console.log("Commands: add | list | search | remove");
