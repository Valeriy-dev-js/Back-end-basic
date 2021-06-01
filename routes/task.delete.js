const { Router } = require("express");
const { Task } = require('../models')
const router = Router();



router.delete('/task/:id', async (req, res) => {
    const id = req.params.id;
    console.log('ID', typeof id);
    try {
        const user = await Task.destroy({where: 
            { uuid: id }
        });
        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.send("Cant delete task")
    };
});

module.exports = router;