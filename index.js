const inquirer = require('inquirer');
const fs = require('fs');

function License (name, badge) {
  this.name = name;
  this.badge = badge;
}

const licenses = [
  new License("Apache license 2.0", "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"),
  new License("GNU General Public License v3.0", "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)"),
  new License("IBM Public License Version 1.0", "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"),
  new License("MIT", "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"),
  new License("Mozilla Public LIcense 2.0", "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"),
  new License("Zlib", "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)")
];

function generateREADMEText({title, description, installInstructions, usageInfo, contributingGuidelines, testInstructions, licenseName, gitHubID, email}) {

  // console.log(title, description, installInstructions, usageInfo, contributingGuidelines, testInstructions, licenseName, gitHubID, email)
  // console.log(`LN: ${licenseName}`);
  // console.log(`BN: ${licenses.filter((license) => license.name === licenseName)[0].badge}`)
return `# ${title}

${licenses.filter((license) => license.name === licenseName)[0].badge}

## Description <a id="description"></a>
${description}

## Table of Contents
[Description](#description)
[Installation](#installation)
[Usage](#usage)
[License](#license)
[Contributing](#contributing)
[Test](#tests)
[Questions](#questions)

## Installation <a id="installation"></a>
${installInstructions}

## Usage <a id="usage"></a>
${usageInfo}

## License <a id="license"></a>
${licenseName}

## Contributing <a id="contributing"></a>
${contributingGuidelines}

## Tests <a id="tests"></a>
${testInstructions}

## Questions <a id="questions"></a>
To view the GitHub Repository: https://github.com/${gitHubID}
Please contact ${email} with any questions`
}

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
      name: 'installInstructions',
      message: "What are your project's installation instructions?",
    },
    {
      type: 'input',
      name: 'usageInfo',
      message: 'What is the usage information for your project?',
    },
    {
      type: 'input',
      name: 'contributingGuidelines',
      message: "What are your project's contribution guidelines?",
    },
    {
      type: 'input',
      name: 'testInstructions',
      message: "What are your project's testing instructions?"
    },
    {
      type: 'list',
      name: 'licenseName',
      message: "Choose your project's license:",
      choices: licenses.map((license) => license.name)
    },
    {
      type: 'input',
      name: 'gitHubID',
      message: "What is your GitHub account's name?"
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the email address for questions?"
    }
  ]);
};

function init() {
  promptUser()
    // Use writeFileSync method to use promises instead of a callback function
    .then((answers) => fs.writeFileSync('README.md', generateREADMEText(answers)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));
};

init();
