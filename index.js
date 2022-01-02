const inquirer = require('inquirer');
const fs = require('fs');

const generateREADMEText = ({title, description, screenshot, license}) =>
`#Project Title: ${title}

## Description
${description}

## Screen Capture
![alt text](${screenshot})

## License
${license}`


const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title for your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is a short description for your project?',
    },
    {
      type: 'input',
      name: 'screenshot',
      message: 'Where is the screenshot for your project?',
    }
  ]);
};

const init = () => {
  promptUser()
    // Use writeFileSync method to use promises instead of a callback function
    .then((answers) => fs.writeFileSync('README.md', generateREADMEText(answers)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));
};

init();
