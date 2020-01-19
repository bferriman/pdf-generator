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

        const { color } = await inquirer.prompt({
            message: "Background color:",
            name: "color"
        });

        const { data } = await axios.get(
            `http://api.github.com/users/${username}`
        );

        const starred = await axios.get(`https://api.github.com/users/${username}/starred`);

        const buf = axios({
            method: 'get',
            url: data.avatar_url,
            responseType: 'arraybuffer'
        })
        .then(response => {
            const buf = Buffer.from(response.data, "binary");
            const passedData = {
                name: data.name,
                html_url: data.html_url,
                blog: data.blog,
                location: data.location,
                public_repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                stars: starred.data.length,
                bio: data.bio,
                bgColor: color,
                imgBuffer: buf
            }
            buildPDF(passedData);
        });
    }
    catch (err) {
        console.log(err);
    }
}

function buildPDF(data) {

    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(`${data.name.replace(/ /g, "_")}.pdf`));

    //background
    doc.rect(0, 0, 612, 792)
    .fill(data.bgColor);
    //links card
    doc.roundedRect(260, 425, 325, 205, 12)
    .lineWidth(2)
    .fillAndStroke("white", "#060666");
    //links text
    doc.font("./assets/fonts/Amble-Regular.ttf");
    doc.fontSize(18);
    doc.fillColor("black")
    .text("Links", 297, 450, {
        width: 263,
        height: 130,
        align: "center",
    })
    .moveDown()
    .fontSize(14)
    .text("GitHub:", {
        align: "left",
    })
    .fontSize(10)
    .fillColor("blue")
    .text(data.html_url.trim(), {
        link: data.html_url.trim()
    })
    .moveDown()
    .fontSize(14)
    .fillColor("black")
    .text("Blog:")
    .fontSize(10)
    .fillColor("blue")
    .text(data.blog.trim(), {
        link: data.blog.trim()
    })
    .moveDown()
    .fontSize(14)
    .fillColor("black")
    .text("Location:")
    .fontSize(10)
    .fillColor("blue")
    .text(data.location.trim(), {
        link: `https://www.google.com/maps/place/${data.location.trim()}`
    });

    //vertical banner
    doc.rect(50, -5, 220, 802)
    .lineWidth(5)
    .fillAndStroke("white", "#060666");
    //name banner shadow
    doc.roundedRect(30, 30, 552, 75, 4)
    .fillOpacity(0.5)
    .fill("black");
    //name banner
    doc.roundedRect(25, 25, 562, 75, 2)
    .lineWidth(2)
    .fillOpacity(1)
    .fillAndStroke("white", "#060666");
    //name text
    doc.fontSize(45);
    doc.fillColor("black")
    .text(data.name, 50, 40, {
        width: 512,
        height: 45,
        align: "center"
    });
    //GitHub stats text
    doc.fontSize(28)
    .text("GitHub Stats", 65, 400, {
        width: 190,
        height: 350,
        align: "center"
    })
    .fontSize(20)
    .moveDown()
    .text(`Public Repos: ${data.public_repos}`, {
        align: "left"
    })
    .moveDown()
    .text(`Followers: ${data.followers}`)
    .moveDown()
    .text(`Following: ${data.following}`)
    .moveDown()
    .text(`Stars: ${data.stars}`);
    //bio card
    doc.roundedRect(310, 145, 275, 210, 12)
    .lineWidth(2)
    .fillAndStroke("white", "#060666");
    //bio text
    doc.fontSize(18)
    .fillColor("black")
    .text(data.bio, 335, 170, {
        width: 225,
        height: 160,
        align: "left",
        oblique: 10
    });
    //image shadow
    doc.roundedRect(40, 130, 240, 250, 15)
    .fillOpacity(0.5)
    .fill("black");


    //image
    doc.roundedRect(35, 125, 250, 250, 12).clip();
    doc.fillOpacity(1)
    .image(data.imgBuffer, 35, 125, {
        fit: [250, 250],
        align: "center",
        valign: "center"
    });
    //image border
    doc.roundedRect(35, 125, 250, 250, 12)
    .lineWidth(6)
    .stroke("#060666");
    doc.end();
}

main();


