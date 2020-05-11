const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  p_comissao: Number,
  vl_recorrente: Number,
  vl_comissao_calculado: Number,
  vl_comissao: Number,
  vcm_recorrente_atual: Number,
  nr_comissao: Number,
  nr_nota_fiscal: Number,
  dc_chave_contrato: String,
  dt_inicio_ctr: Date,
  dt_validacao_ctr: Date,
  dt_inclusao_ctr: Date,
  dc_nota_fiscal: String,
  dt_emissao: Date,
  dt_vencimento: Date,
  dt_vencimento_original: Date,
  nr_cnpj: String,
  nr_contrato_serasa: String,
  dc_razao_social: String,
  dc_flag_comissionado: String,
  row: Number,
  flag_erro_calculo: Boolean,
});

module.exports = mongoose.model('Incident', IncidentSchema);
