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
    doc.rect(0, 0, 612, 792)
    .fill("blue");
    doc.roundedRect(310, 425, 315, 180, 12)
    .lineWidth(2)
    .fillAndStroke("white", "#060666");
    doc.rect(50, -5, 220, 802)
    .lineWidth(5)
    .fillAndStroke("white", "#060666");
    doc.roundedRect(20, 30, 562, 75, 4)
    .fillOpacity(0.5)
    .fill("black");
    doc.roundedRect(25, 25, 562, 75, 2)
    .lineWidth(2)
    .fillOpacity(1)
    .fillAndStroke("white", "#060666");
    doc.fontSize(45);
    doc.fillColor("black")
    .text(user.name, 50, 40, {
        width: 512,
        height: 45,
        align: "center"
    });
    doc.fontSize(28)
    .text("GitHub Stats", 65, 400, {
        width: 190,
        height: 350,
        align: "center"
    })
    .fontSize(20)
    .moveDown()
    .text(`Public Repos: ${user.public_repos}`, {
        align: "left"
    })
    .moveDown()
    .text(`Followers: ${user.followers}`)
    .moveDown()
    .text(`Following: ${user.following}`)
    .moveDown()
    .text(`Stars: All Em!`);

    doc.roundedRect(310, 145, 275, 210, 12)
    .lineWidth(2)
    .fillAndStroke("white", "#060666");
    doc.fontSize(18)
    .fillColor("black")
    .text(user.bio, 335, 170, {
        width: 225,
        height: 160,
        align: "left",
        oblique: 10
    });


    doc.roundedRect(35, 125, 250, 250, 18).clip();
    doc.image("profilepic.jpg", 35, 125, {fit: [250, 250], align: "center", valign: "center"});
    doc.roundedRect(35, 125, 250, 250, 18)
    .lineWidth(10)
    .stroke("#060666");
    doc.end();
}

main();


