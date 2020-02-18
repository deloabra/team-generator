const fs = require("fs").promises;

const {Employee, Engineer, Manager, Intern, input} = require("./lib");

async function init(){

    //all employee cards will be put in here before going into the template
    let content = "";

    //call function to handle questions and get array of employees
    const employees = await input.question();

    //create template
    let template = await getFile("./templates/main.html");

    for(const e of employees){
        
        let card;

        switch(e.getRole()){

            case("Manager"):
                card = await getFile("./templates/manager.html");
                card = card.replace(/\$officeNumber\$/g, e.getOfficeNumber());
                break;
            
            case("Engineer"):
                card = await getFile("./templates/engineer.html");
                card = card.replace(/\$github\$/g, e.getGithub());
                break;

            case("Intern"):
                card = await getFile("./templates/intern.html");
                card = card.replace(/\$school\$/g, e.getSchool());
                break;
            
        }

        card = card.replace(/\$name\$/g, e.getName());
        card = card.replace(/\$ID\$/g, e.getId());
        card = card.replace(/\$email\$/g, e.getEmail());

        content += card;

    }

    //console.log(content);

    template = template.replace(/\$content\$/g, content);

    fs.writeFile("./output/index.html", template).then((err) => {if (err) throw err});

    console.log("index.html created in the output folder with all of your employees.");
}

async function getFile(file){
    try {
        return fs.readFile(file, "utf-8");
    } catch (error) {
        return error;
    }
}

init();