# pdf-generator

## Description

This is a Node application that prompts the user for a GitHub username and a color, then constructs a PDF profile document using their GitHub data with a background of the selected color.

## Usage

After cloning the repo, run `npm install` to install dependencies.
Run `node index.js` to execute the app.

## Opportunities for Further Development

There is no validation of input.  It would be good to check for things like strings that don't map to colors and respond appropriately.

It would be useful to add prompts to allow the user to search for additional users and make additional pdfs.

Similarly, I'd like to add an option to accept a csv file (or similar) that contains a list of usernames as input and generate pdfs for all.

## Credits

Using the "Amble" font by Punchcut on fontsquirrel.com
Using the following npm packages:
fs
axios
inquirer
pdfkit