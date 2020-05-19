const Incident = require('../models/Incident');

module.exports = {
  async index(req, res){
    const incidents = await Incident.find();
    return res.json(incidents);
  },

  async store(req, res){
    const vl_comissao_calculado = req.body.p_comissao * req.body.vl_recorrente;
    const { dc_nota_fiscal } = req.body;
    let incident = await Incident.findOne({dc_nota_fiscal});
    if(!incident){
      incident = await Incident.create({
        row: req.body.row,
        p_comissao: req.body.p_comissao,
        vl_recorrente: req.body.vl_recorrente,
        vl_comissao_calculado,
        vl_comissao: req.body.vl_comissao,
        nr_nota_fiscal: req.body.nr_nota_fiscal,
        nr_cnpj: req.body.nr_cnpj,
        dc_chave_contrato: req.body.dc_chave_contrato,
        dc_nota_fiscal,
        dc_razao_social: req.body.dc_razao_social,
        dc_flag_comissionado: req.dc_flag_comissionado,
        dt_inclusao_ctr: req.body.dt_inclusao_ctr,
     });
    }
    return res.json(incident);
  },
  //Funciona apenas com a estrutura específica do objeto retornado da leitura da planilha de comissão
  async storeXlsx(req){
    const dc_nota_fiscal = req.DC_NOTA_FISCAL;
    let incident = await Incident.findOne({ dc_nota_fiscal });
    if(!incident){
      const vl_comissao_calculado = req.P_COMISSAO * req.VL_RECORRENTE;
      let flag_erro_calculo = false
      if(vl_comissao_calculado !== req.VL_COMISSAO){
         flag_erro_calculo = true;
      }
      incident = await Incident.create({
        row: req.row,
        flag_erro_calculo,
        p_comissao: req.P_COMISSAO,
        vl_recorrente: req.VL_RECORRENTE,
        vl_comissao_calculado,
        vl_comissao: req.VL_COMISSAO,
        nr_nota_fiscal: req.NR_NOTA_FISCAL,
        nr_cnpj: req.NR_CNPJ,
        dc_chave_contrato: req.DC_CHAVE_CONTRATO,
        dc_nota_fiscal: req.DC_NOTA_FISCAL,
        dc_razao_social: req.DC_RAZAO_SOCIAL,
        dc_flag_comissionado: req.DC_FLAG_COMISSIONADO,
        dt_inclusao_ctr: req.DT_INCLUSAO_CTR,
      });
    }
    return incident;
  },

  async delete(req, res){
    const incident = await Incident.findById(req.params.id);
    await incident.remove();
    return res.send();
  },

  async updateChecked(req, res){
    const id = req.params.id;
    const incident = await Incident.findById(id);
   if(!incident){
     return res.send(500);
   }
   if(incident.flag_checked === false){
    const response = await Incident.findOneAndUpdate({_id: id}, {$set: {flag_checked: true}}, {returnOriginal: false});
    return res.json(response.data);
   }else{
    const response = await Incident.findOneAndUpdate({_id: id}, {$set: {flag_checked: false}}, {returnOriginal: false});
    return res.json(response.data);
   }
  }
};
