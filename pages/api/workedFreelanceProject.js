const workedFreeLanceProjects = require('../../data/workedFreelanceProjects.json');

export default async function handler(req, res) {
    return res.status(200).json(workedFreeLanceProjects);
}

