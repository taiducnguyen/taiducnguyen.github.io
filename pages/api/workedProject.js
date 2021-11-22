const workedProjects = require('../../data/workedProjects.json');

export default async function handler(req, res) {
    return res.status(200).json(workedProjects);
}

