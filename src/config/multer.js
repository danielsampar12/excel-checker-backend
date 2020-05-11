const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      })
    },
  }),
  //fazer a parte para amazon s3 e atualizar o .env
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/excel',
      'application/vnd.ms-excel'
    ];
    if(allowedMimes.includes(file.mimetype)){
      cb(null, true);
    }else{
      cb(new Error('Invalid file type'));
    }
  },
 };
