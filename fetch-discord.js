var request = require('request');
const util = require('util');

request('https://raw.githack.com/naturalcrit/homebrewery/master/changelog.md', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let data = body.split('\n### ')[1];
    data = '**Change Log**\r\nFor a full record of development, visit our Github Page - https://github.com/naturalcrit/homebrewery\r\n\r\n' + data + '\r\nAs always, if you find any issues or have a suggestion, please feel free to let us know!\r\n\r\n\\- Gambatte';

    const replacements = [
      { search: '{{taskList', replace: '' },
      { search: '{{note', replace: '' },
      { search: '[x]', replace: '' },
      { search: '}}', replace: '' },
      { search: '\r-', replace: '-' },
      { search: '\r\n\r\n\r\n', replace: '\r\n\r\n' },
    ];

    replacements.forEach((terms)=>{
      data = data.split(terms.search).join(terms.replace);
    });

    const transforms = [
      { search: '*  ', prefix: '- ', suffix: '' },
      { search: '##### ', prefix: '**', suffix: '**' },
    ];

    let lines = data.split('\r\n');
    let output = [];

    // Wrap the fourth line in __** **__
    lines[3] = '__**' + lines[3] + '**__'

    lines.forEach((line)=>{
      let check = false;
      transforms.forEach((transform)=>{
        if(!check && line.substring(0,transform.search.length) == transform.search){
          check = true;
          output.push(transform.prefix + line.substring(transform.search.length) + transform.suffix);
        };
      });
      if(!check) output.push(line);
    });

    data = output.join('\r\n');

    require('child_process').spawn('clip').stdin.end(data);
    console.log(data);
  }
  else {
    console.log("Error "+response.statusCode)
  }
})

// https://raw.githack.com/naturalcrit/homebrewery/master/changelog.md

