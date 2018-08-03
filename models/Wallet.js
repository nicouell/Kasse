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

WalletSchema.methods.initiateDate = () => {
  let beginDate = Date.now();
  const endDate = beginDate + 30 * 24 * 60 * 60 * 1000;
  const log = this.log;

  while (beginDate <= endDate) {
    let d = new Date(beginDate);
    log.push({
      date: d,
      debut: this.solde,
      fin: this.solde
    });
    beginDate += 24 * 60 * 60 * 1000;
  }
  return log;
};

module.exports = Wallet = mongoose.model("wallets", WalletSchema);
