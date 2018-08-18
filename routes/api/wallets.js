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
    const errors = {};

    Wallet.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user", ["name", "solde"])
      .then(wallets => {
        if (!wallets) {
          errors.noprofile = "There is no wallets for this user";
          return res.status(404).json(errors);
        }
        res.json(wallets);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/wallet/:id
// @desc    Get wallet by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ id: req.user.id }).then(user => {
      Wallet.findById(req.params.id)
        .then(wallet => {
          if (wallet.user.toString() !== req.user.id) {
            return res.status(401).json({ notautorized: "user not autorized" });
          }
          res.json(wallet);
        })
        .catch(err =>
          res.status(404).json({ nopostfound: "No Wallet found with that ID" })
        );
    });
  }
);

// @route   POST api/wallet
// @desc    Create wallet
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newWallet = new Wallet({
      user: req.user.id,
      name: req.body.name,
      solde: req.body.solde
    });
    newWallet.log = newWallet.initiateDate(req.body.solde);
    newWallet.save().then(wallet => res.json(wallet));
  }
);

// @route   POST api/wallet/:id/soldeadd
// @desc    add to solde
// @access  Private

router.post("/soldeadd/:id", passport.authenticate("jwt", { session: false })),
  (req, res) => {
    //    const solde = req.solde;
    const id = req.params.id;
    const walletFieldAdd = {};
    walletFieldAdd.solde = req.body.addToSolde;
    Wallet.findByIdAndUpdate(id, { $set: walletFieldAdd }, { new: true }).then(
      wallet => res.json(wallet)
    );
  };

module.exports = router;
