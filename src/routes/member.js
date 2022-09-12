const express = require('express');
const controller = require('../controllers/member');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const member = await controller.findById(req.params.id);
        return res.status(member ? 200 : 204).json(member);
    } catch (err) {
        return next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const state = req.query.state;

        return res.json(await controller.search(name, state));
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const member = await controller.create(data);
        return res.status(201).json(member);
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const member = await controller.update(id, data);
        return res.status(201).json(member);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await controller.deleteById(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
});

module.exports = router;