const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WalletSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = Wallet = mongoose.model("users", WalletSchema);
