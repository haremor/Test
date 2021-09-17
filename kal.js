const fs = require("fs");

let fileData = fs.readFileSync("ppl.csv", "utf-8");

fileData = fileData.replace(/;/g, " ").split("\r\n");

let people = [];

class Person {
    constructor(name, surname, sex, dob) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.dob = dob;
        this.docname = `${this.name[0]}. ${surname}`;
    }
}

let len = fileData.length;
for (let i = 0; i < len; i++) {
    const el = fileData[i].split(" ");
    const person = new Person(...el);
    people.push(person)
}

people.shift();

people.map((el) => {
    el.dob = el.dob.split("-");
}).sort((a, b) => {
    return new Date(...a.dob) - new Date(...b.dob);
})

console.log(people);