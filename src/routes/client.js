const express = require('express');
const controller = require('../controllers/client');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const client = await controller.findById(req.params.id);
        return res.status(client ? 200 : 204).json(client);
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
        const client = await controller.create(data);
        return res.status(201).json(client);
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const client = await controller.update(id, data);
        return res.json(client);
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

router.get('/:id/members', async (req, res, next) => {
    try {
        const members = await controller.getClientMembers(req.params.id);
        return res.json(members);
    } catch (err) {
        return next(err);
    }
});

router.post('/:id/members', async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const memberId = req.body.memberId;
        const clientMemberId = await controller.addClientMember(clientId, memberId);
        return res.status(201).json({ clientMemberId });
    } catch (err) {
        return next(err);
    }
});

router.delete('/:clientId/members/:memberId', async (req, res, next) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const memberId = parseInt(req.params.memberId);
        await controller.deleteClientMember(clientId, memberId);
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
});





module.exports = router;