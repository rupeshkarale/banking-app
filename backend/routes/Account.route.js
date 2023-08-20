const express = require("express")
const AccountModel = require("../Models/Account.model.js")

const AccountRouter = express.Router();


AccountRouter.get("/gettransection/:id", async (req, res) => {
     const Id = req.params.id
     console.log(Id)

     try {
          const transaction = await AccountModel.find({ trasectionBy: Id })
          return res.status(200).send(transaction)
     }
     catch {
          return res.status(400).send("error in getting transection")
     }
})

module.exports = AccountRouter;