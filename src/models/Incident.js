const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  p_comissao: Number,
  dc_flag_comissionado: String,
  nr_cnpj: String,
  nr_nota_fiscal: Number,
  dc_chave_contrato: String,
  dc_nota_fiscal: String,
  dc_razao_social: String,
  dt_inclusao_ctr: Date,
  vl_recorrente: Number,
  vl_comissao_calculado: Number,
  vl_comissao: Number,
  row: Number,
  flag_erro_calculo: Boolean,
  flag_checked: Boolean,
});

IncidentSchema.pre('save', function(){
  this.flag_checked = false;
})

module.exports = mongoose.model('Incident', IncidentSchema);
