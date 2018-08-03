const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Wallet = require("../../models/Wallet");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Wallet works" }));

// @route   GET api/wallet
// @desc    Get current user wallet
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wallet.find()
      .sort({ date: -1 })
      .then(wallets => res.json(wallets))
      .catch(err => res.status(404).json({ nowalletfound: "No Wallet found" }));
  }
);

// @route   GET api/wallet/:id
// @desc    Get wallet by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wallet.findById(req.params.id)
      .then(wallet => res.json(wallet))
      .catch(err =>
        res.status(404).json({ nopostfound: "No Wallet found with that ID" })
      );
  }
);

// @route   POST api/wallet
// @desc    Create wallet
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let beginDate = Date.now();
    const endDate = beginDate + 30 * 24 * 60 * 60 * 1000;
    const log = [];

    while (beginDate <= endDate) {
      let d = new Date(beginDate);
      log.push({
        date: d,
        debut: req.body.solde,
        fin: req.body.solde
      });
      beginDate += 24 * 60 * 60 * 1000;
    }

    const newWallet = new Wallet({
      name: req.body.name,
      solde: req.body.solde,
      log: log
    });
    newWallet.save().then(wallet => res.json(wallet));
  }
);

module.exports = router;
