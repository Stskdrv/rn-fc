const errorHendler = require("../utils/errorHendler");

const Record = '../models/Record.js';


module.exports.getAll = async (req, res) => {
    try {
        const records = await Record.find({user: req.user.id})
        res.status(200).json(records);
    } catch (e) {
        errorHendler(res,e);
    }
};

module.exports.newRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        res.status(200).json(record);
    } catch (e) {
        errorHendler(res,e);
    }
};

module.exports.getById = (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        res.status(200).json(record);
    } catch (e) {
        errorHendler(res,e);
    }
};

module.exports.updRecord = (req, res) => {
    try {

    } catch (e) {
        errorHendler(res,e);
    }
};

module.exports.deleteRecord = async (req, res) => {
    try {
        await Record.remove({_id: req.params.id});
        res.status(200).json('Record was removed');
    } catch (e) {
        errorHendler(res,e);
    }
};

