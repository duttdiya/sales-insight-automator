const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");

async function parseFile(path) {

  if (path.endsWith(".csv")) {

    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });

  } else {

    const workbook = xlsx.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);

  }
}

module.exports = parseFile;