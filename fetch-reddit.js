var request = require('request');
const util = require('util');

request('https://raw.githack.com/naturalcrit/homebrewery/master/changelog.md', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let data = body.split('\n### ')[1];
    data = '## Change Log\r\nFor a full record of development, visit our Github Page - https://github.com/naturalcrit/homebrewery\r\n\r\n' + data + '---\r\n\r\nAs always, if you find any issues or have a suggestion, please feel free to let us know!\r\n\r\n\\- G';

    const replacements = [
      { search: '{{taskList', replace: '' },
      { search: '{{note', replace: '' },
      { search: '[x]', replace: '' },
      { search: '}}', replace: '' },
      { search: '\r\n\r\n\r\n', replace: '\r\n\r\n' },
    ];

    replacements.forEach((terms)=>{
      data = data.split(terms.search).join(terms.replace);
    });

    let lines = data.split('\r\n');
    lines[3] = '### ' + lines[3];

    data = lines.join('\r\n');

    require('child_process').spawn('clip').stdin.end(data);
    console.log(data);
  }
  else {
    console.log("Error "+response.statusCode)
  }
})

// https://raw.githack.com/naturalcrit/homebrewery/master/changelog.md

