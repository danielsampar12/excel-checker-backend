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
        vcm_recorrente_atual: req.body.vcm_recorrente_atual,
        nr_comissao: req.body.nr_comissao,
        nr_nota_fiscal: req.body.nr_nota_fiscal,
        nr_cnpj: req.body.nr_cnpj,
        nr_contrato_serasa: req.body.nr_contrato_serasa,
        dc_chave_contrato: req.body.dc_chave_contrato,
        dc_nota_fiscal,
        dc_razao_social: req.body.dc_razao_social,
        dt_inicio_ctr: req.body.dt_inicio_ctr,
        dt_validacao_ctr: req.body.dt_validacao_ctr,
        dt_inclusao_ctr: req.body.dt_inclusao_ctr,
        dt_emissao: req.body.dt_emissao,
        dt_vencimento: req.body.dt_vencimento,
        dt_vencimento_original: req.body.dt_vencimento_original,
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
        vcm_recorrente_atual: req.VCM_RECORRENTE_ATUAL,
        nr_comissao: req.NR_COMISSAO,
        nr_nota_fiscal: req.NR_NOTA_FISCAL,
        nr_cnpj: req.NR_CNPJ,
        nr_contrato_serasa: req.NR_CONTRATO_SERASA,
        dc_chave_contrato: req.DC_CHAVE_CONTRATO,
        dc_nota_fiscal: req.DC_NOTA_FISCAL,
        dc_razao_social: req.DC_RAZAO_SOCIAL,
        dc_flag_comissionado: req.DC_FLAG_COMISSIONADO,
        dt_inicio_ctr: req.DT_INICIO_CTR,
        dt_validacao_ctr: req.DT_VALIDACAO_CTR,
        dt_inclusao_ctr: req.DT_INCLUSAO_CTR,
        dt_emissao: req.DT_EMISSAO,
        dt_vencimento: req.DT_VENCIMENTO,
        dt_vencimento_original: req.DT_VENCIMENTO_ORIGINAL,
      });
    }
    return incident;
  },

  async delete(req, res){
    const incident = await Incident.findById(req.params.id);
    await incident.remove();
    return res.send();
  }
};