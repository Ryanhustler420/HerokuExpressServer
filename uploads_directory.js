const fs = require('fs');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const luxon = require('luxon');

module.exports = async function() {
  checkAndPerformCleanup();
}

let timesRan = 1;
let waitForSeconds = 600000; // (1000 * 60) * 10 (min)
async function checkAndPerformCleanup() {
  console.log(`${timesRan++} Times checkAndPerformCleanup()`);

  const folder = __dirname + `/uploads`;
  if (!fs.existsSync(folder)) await mkdirp(folder);
  const files = fs.readdirSync(folder);

  const needToDelete = [];

  for (const file of files) {
    // fs.readFileSync(folder + '/' + file, 'utf8');
    let fileNameWithoutExtention = file.split('.')[0].split('-')[0];
    if (!isNumeric(fileNameWithoutExtention)) continue;
      
    const past = +fileNameWithoutExtention;
    const old = luxon.DateTime.fromJSDate(new Date(past)).toISO();
    // this function only run once,! we want to run this every 10 minutes, or whenevery new data inserted into uploads
    const fresh = new luxon.DateTime(Date.now()).plus({milliseconds: -waitForSeconds}).toISO();
    if (old < fresh) { // if old is less the current - 1 date
        needToDelete.push(`${folder}/${file}`);
    }
  }

  for (var every of needToDelete) {
    // const data = fs.readFileSync(every, 'utf8');
    fs.unlink(every, () => {});
  }

  setTimeout(() => checkAndPerformCleanup(), waitForSeconds);

}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}