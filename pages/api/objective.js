const objective = require('../../data/objective.json');

export default async function handler(req, res) {
    return res.status(200).json(objective);
}

