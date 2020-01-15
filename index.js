const axios = require("axios");
const inquirer = require("inquirer");

async function getUsername() {
    try {
        const { username } = await inquirer.prompt({
            message: "GitHub username:",
            name: "username"
        });

        console.log(username);
    }
    catch (err) {
        console.log(err);
    }
}

getUsername();

// inquirer
// .prompt(
//     {
//         message: "Enter GitHub username:",
//         name: "username"
//     }
// )
// .then( { username } => {
//     console.log(username);
// });