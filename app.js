const fs = require("fs");

const {Employee, Engineer, Manager, Intern, input} = require("./lib");

async function init(){

    //call function to handle questions and get array of employees
    const employees = await input.question();

    
}

init();