const axios = require("axios");
const inquirer = require("inquirer");

async function getUsername() {
    try {
        const { username } = await inquirer.prompt({
            message: "GitHub username:",
            name: "username"
        });

        const { data } = await axios.get(
            `http://api.github.com/users/${username}`
        );
    }
    catch (err) {
        console.log(err);
    }
}

getUsername();
