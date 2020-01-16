const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function main() {
    try {
        const { username } = await inquirer.prompt({
            message: "GitHub username:",
            name: "username"
        });

        const { data } = await axios.get(
            `http://api.github.com/users/${username}`
        );

        buildPDF(data);
    }
    catch (err) {
        console.log(err);
    }
}

const dummyStr = "Well I guess I'm going to come in here and type a bunch of text just to see if anything happens and if I don't quite type enough text to match the lorem ipsum text in the example I guess that's ok but I'll keep typing for a bit just to see if I can get close.";

function buildPDF(user) {
    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(`${user.name.replace(/ /g, "_")}.pdf`));

    //add content here
    doc
    .text('And here is some wrapped text...', 100, 300)
    .font('Times-Roman', 13)
    .moveDown()
    .text(dummyStr, {
        width: 400,
        align: 'justify',
        indent: 30,
        columns: 2,
        height: 300,
        ellipsis: true
    });


    doc.end();
}

main();


