const xlsx = require('xlsx');

function ReadFile(key){
  
  const workBook = xlsx.readFile(`./tmp/${key}`, {cellDates: true});

  const workSheet = workBook.Sheets['BASE_PARCELA_COMISSIONADA'];

  let data = xlsx.utils.sheet_to_json(workSheet);

  let newData = data.map(function(record, index){
    record.row = index + 2;
    return record;
  })

  return newData;
}

module.exports = ReadFile;
