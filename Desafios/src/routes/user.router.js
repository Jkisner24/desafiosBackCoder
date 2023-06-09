const {Router} = require('express');
const UserManager = require('../dao/mongo/user.mongo')
const userManager = new UserManager()

const router = Router()

router.get('/', async(req,res)=>{
    try {
        let users = await userManager.getUsers(req.query)
        res.send ({
            status: "success",
            payload: users
        });
    } catch (error) {
        console.log(error);
    }
})
router.get('/uid', async(req,res)=>{
    const {uid} = req.params
    try {
        let user = await userManager.getUsersById(uid)
        res.send ({
            status: "success",
            payload: user
        });
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        let result = await userManager.addUser(req.body);
        res.status(201).send({
            status: "success",
            result
        });
    } catch (error) {
        console.log(error)
    }
})

router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const changes = req.body;
        let result = await userManager.updateUser(uid, changes);
        res.send({
            status: "success",
            payload: result
        });
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        await userManager.deleteUser(uid);
        res.send({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router