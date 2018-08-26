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

router.post(
  "/soldeadd/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wallet.findById(req.params.id).then(wallet => {
      const solde = wallet.solde;
      const logArray = wallet.log;
      const today = new Date(Date.now()).getDate();
      const index = logArray
        .map(dt => new Date(dt.date).getDate())
        .indexOf(today);
      const id = req.params.id;
      const updatedSolde = parseFloat(req.body.addToSolde) + solde;
      logArray.map((lg, i) => {
        if (i === index) {
          lg.fin = updatedSolde;
        } else if (i > index) {
          lg.debut = updatedSolde;
          lg.fin = updatedSolde;
        }
      });
      Wallet.findByIdAndUpdate(
        id,
        { $set: { solde: updatedSolde.toString(), log: logArray } },
        { new: true }
      ).then(wallet => res.json(wallet));
    });
  }
);

// @route   POST api/wallet/soldedim/:id
// @desc    diminuing to solde
// @access  Private

router.post(
  "/soldedim/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wallet.findById(req.params.id).then(wallet => {
      const solde = wallet.solde;
      const logArray = wallet.log;
      const today = new Date(Date.now()).getDate();
      const index = logArray
        .map(dt => new Date(dt.date).getDate())
        .indexOf(today);
      const id = req.params.id;
      const updatedSolde = solde - parseFloat(req.body.dimToSolde);
      logArray.map((lg, i) => {
        if (i === index) {
          lg.fin = updatedSolde;
        } else if (i > index) {
          lg.debut = updatedSolde;
          lg.fin = updatedSolde;
        }
      });
      Wallet.findByIdAndUpdate(
        id,
        { $set: { solde: updatedSolde.toString(), log: logArray } },
        { new: true }
      ).then(wallet => res.json(wallet));
    });
  }
);

// @route   DELETG api/wallet/:id
// @desc    delete solde
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wallet.findByIdAndRemove(req.params.id).then(() =>
      res.json({ succes: true })
    );
  }
);

module.exports = router;
