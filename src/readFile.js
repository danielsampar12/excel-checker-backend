const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

function ReadFile(key){
  
  const workBook = xlsx.readFile(`./tmp/${key}`, {cellDates: true});

  const workSheet = workBook.Sheets['BASE_PARCELA_COMISSIONADA'];

  let data = xlsx.utils.sheet_to_json(workSheet);

  let newData = data.map(function(record, index){
    record.row = index + 2;
    return record;
  })
  promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', key));
  return newData;
}

module.exports = ReadFile;
