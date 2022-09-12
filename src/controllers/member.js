const db = require('../../models/index');
const Sequelize = require('sequelize');
const Member = db.sequelize.models.Member;

async function search(name) {
    let where = {};
    if (name) {
        where.name = {
            [Sequelize.Op.like]: `%${name}%`
        }
    }

    return await Member.findAll({ where });
}

async function findById(id) {
    return await Member.findByPk(id);
}

async function create(data) {
    return await Member.create(data);
}

async function update(id, data) {
    return await Member.update(data, { where: { id }});
}

async function deleteById(id) {
    return await Member.destroy({ where: { id } });
}

module.exports = { search, findById, update, create, deleteById };
