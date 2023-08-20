const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
        date: { type: Date, default: Date.now },
        time: { type: String },
        status: { type: String },
        actionamount: { type: Number },
        trasactionBy: {
                type: String,
        },
        balance: { type: Number },
}, { timestamps: true })

const AccountModel = mongoose.model("Account", accountSchema);
module.exports = AccountModel;