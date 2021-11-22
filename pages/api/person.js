const personalInfo = require('../../data/personalInformation.json');

export default async function handler(req, res) {
    return res.status(200).json(personalInfo);
}

