const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  solde: {
    type: Number,
    default: 0
  },
  log: [
    {
      date: {
        type: Date
      },
      debut: {
        type: Number,
        default: 0
      },
      fin: {
        type: Number,
        default: 0
      },
      event: [
        {
          type: Number,
          default: 0
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Wallet = mongoose.model("wallets", WalletSchema);
