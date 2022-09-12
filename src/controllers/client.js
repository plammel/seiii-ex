const db = require('../../models/index');
const Sequelize = require('sequelize');
const Client = db.sequelize.models.Client;
const ClientMember = db.sequelize.models.RelClientMember;

async function search(name, state) {
    let where = {};
    if (name) {
        where.companyName = {
            [Sequelize.Op.like]: `%${name}%`
        }
    }
    if (state) {
        where.state = state
    }
    console.log({Client})
    return await Client.findAll({ where });
}

async function findById(id) {
    return await Client.findByPk(id);
}

async function create(data) {
    return await Client.create(data);
}

async function update(id, data) {
    return await Client.update(data, { where: { id }});
}

async function deleteById(id) {
    return await Client.destroy({ where: { id } });
}

async function getClientMembers(clientId) {
    return await ClientMember.findAll({ where: { ClientId: clientId } });
}

async function addClientMember(clientId, memberId) {
    const data = { ClientId: clientId, MemberId: memberId };
    const clientMember = await ClientMember.findOne({ where: data });
    if (!clientMember) {
        return await ClientMember.create(data);
    }
    return clientMember;
}

async function deleteClientMember(clientId, memberId) {
    const where = { ClientId: clientId, MemberId: memberId };
    return await ClientMember.destroy({ where });
}

module.exports = { search, findById, update, create, deleteById, addClientMember, deleteClientMember, getClientMembers };
