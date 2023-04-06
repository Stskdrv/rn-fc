const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'images/');
    },
    filename(req, file, cb) {
        const date =  moment().format('DDDMMYYYY-HHmmss_SSS');
        callback(null, `${date}-${file.originalname}`);
    }
});

const fileFilter = (req, file, callbach) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callbach(null,true);
    } else {
        callbach(null,false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5,
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})