const Incident = require('../models/Incident');
const IncidentControler = require('./IncidentController');

function IncidentChecker(data){
  data.map(async(record)=> {
    if(record.DC_FLAG_COMISSIONADO === 'COMISSIONADO'){
      if((record.P_COMISSAO * record.VL_RECORRENTE) !== record.VL_COMISSAO){
        await IncidentControler.storeXlsx(record);
      }
    }
  });
  const newData = data.reduce((acc, curr) => {
    return curr.NR_NOTA_FISCAL !== acc.lastElement.NR_NOTA_FISCAL + 1 
    && curr.NR_CNPJ === acc.lastElement.NR_CNPJ
    && curr.DC_FLAG_COMISSIONADO === 'COMISSIONADO'
    ? {
      comErro: [
        ...acc.comErro,
        curr
      ],
      lastElement: {
        ...curr
      }
    }
    : {
      comErro: [
        ...acc.comErro.filter(item => item !== curr)
      ],
      lastElement: {
        ...curr
      }
    }
  },{
    comErro: [],
    lastElement: {}
  });
  
  newData.comErro.map(async(record)=> {
    await IncidentControler.storeXlsx(record);
  })
}

module.exports = IncidentChecker;