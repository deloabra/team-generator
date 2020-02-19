const inquirer = require("inquirer");
const Employee = require("./Employee");
const Engineer = require("./Engineer");
const Manager = require("./Manager");
const Intern = require("./Intern");

module.exports.question = async function(){
    let members = [];
    let next;

    //First person(not optional)
    const man = await inquirer.prompt([
        {
            type: "input",
            message: "Enter your name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter your id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter your email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter your office number",
            name: "office"
        },
        {
            type: "list",
            message: "Add another employee?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "next"
        }
    ]);

    next = man.next;

    members.push(new Manager(man.name, man.id, man.email, man.office));

    //Add more employees until prompted to end
    while(next !== "No more employees"){
        let data;
        if(next === "Intern"){
            data = await internQuestions();
            members.push(new Intern(data.name, data.id, data.email, data.school));
        }
        else{
            data = await engineerQuestions();
            members.push(new Engineer(data.name, data.id, data.email, data.school));
        }
        next = data.next;
    }

    return members;
}

async function internQuestions(){
    return await inquirer.prompt([
        {
            type: "input",
            message: "Enter their name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter their id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter their email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter their school",
            name: "school"
        },
        {
            type: "list",
            message: "Add another employee?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "next"
        }
    ]);
}

async function engineerQuestions(){
    return await inquirer.prompt([
        {
            type: "input",
            message: "Enter their name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter their id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter their email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter their github username",
            name: "github"
        },
        {
            type: "list",
            message: "Add another employee?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "next"
        }
    ]);
}