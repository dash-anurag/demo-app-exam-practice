const xlsx = require("xlsx");

const editExcel = (path, filename) => {
  const wb = xlsx.readFile(path);
  // console.log(wb.SheetNames);

  const ws = wb.Sheets["Sheet1"];

  const data = xlsx.utils.sheet_to_json(ws);
  // console.log(data);

  const newData = data.map((record) => {
    record.url = "test-url.com/" + record.email;
    return record;
  });

  // console.log(newData);

  const newWB = xlsx.utils.book_new();
  const newWS = xlsx.utils.json_to_sheet(newData);

  xlsx.utils.book_append_sheet(newWB, newWS, "New Data");
  xlsx.writeFile(newWB, "./outputFolder/" + filename);
};

// editExcel("input.xlsx");
module.exports = editExcel;
