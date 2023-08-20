const express = require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usermodel = require("../Models/User.model.js")
const Authenticate = require("../Middleware/Authentication.js")
const AccountModel = require("../Models/Account.model.js")

const UserRouter = express.Router()
UserRouter.post("/signup", async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        let presentuser = await Usermodel.findOne({ email });
        if (presentuser) {
            return res.send("email id is linked to another account")
        } else {
            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new Usermodel({ name, email, password: hash, role, balance: 0 })
                await user.save();
                return res.status(200).send("Singup Succefully")
            });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).send("error in signup")
    }
})

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const presentuser = await Usermodel.find({ email });
    if (presentuser.length === 0) {
        return res.status(400).send("wrong email")
    }
    const hash_password = presentuser[0].password;
    const userId = presentuser[0]._id;
    const { name, role, _id } = presentuser[0];
    try {
        bcrypt.compare(password, hash_password, function (err, result) {
            if (result) {
                const token = jwt.sign({ "userId": userId, "name": name }, 'SECRET_KEY');
                if (token) {
                    return res.status(200).send({ "mess": "longin succefull", token: token, role: role, userId: _id })
                } else {
                    return res.status(400).send("error in getting token")
                }

            } else {
                return res.status(400).send("password or username is wrong")
            }
        });


    }
    catch (err) {
        console.log(err);
        return res.status(400).send("error in login")

    }
})

UserRouter.use(Authenticate)
UserRouter.get("/getprofile", async (req, res) => {
    const { user } = req.body;
    try {
        let userEntity = await Usermodel.findById({ _id: user });
        if (userEntity) {
            res.status(200).send(userEntity)
        }
    }
    catch {
        res.status(401).send("error in getting single user")
    }
})





UserRouter.patch("/updateprofile", async (req, res) => {
    const { user, actionamount, balance, time, status } = req.body;
    console.log(user)

    try {
        const transaction = new AccountModel({ actionamount, balance, status, trasactionBy: user, time })
        await transaction.save()

        await Usermodel.findByIdAndUpdate({ _id: user }, { $set: { balance } }, { new: true });

        return res.status(200).send("udpate profile")

    }
    catch {
        return res.status(401).send("error in updating user")
    }
})


UserRouter.get("/getalluser", async (req, res) => {
    const { user } = req.body;
    try {
        const userEntity = await Usermodel.findById({ _id: user });
        if (userEntity.role !== "banker") {
            return res.status(401).send("Unauthorized request")
        }
        else {
            let data = await Usermodel.find({ role: "customer" });
            return res.status(200).send(data)
        }
    }
    catch {
        return res.status(400).send("error in getting accounts")
    }
})

UserRouter.get("/getsingleuser/:id", async (req, res) => {
    const { user } = req.body;
    const Id = req.params.id;
    try {
        const userEntity = await Usermodel.findById({ _id: user });
        if (userEntity.role !== "banker") {
            return res.status(401).send("Unauthorized request")
        }
        else {
            let data = await Usermodel.findById({ _id: Id });
            return res.status(200).send(data)
        }
    }
    catch {
        return res.status(400).send("error in getting single accounts")
    }

})
module.exports = UserRouter;













