module.exports = (db) => {
    const router = require('express').Router();
    const isAuthenticated = require('../config/middleware/isAuthenticated')(db);

    router.post('/create', isAuthenticated, (req, res) => {
        // Need to find if there's a duplicate email in db
        db.Donation.create(req.body).then((dbPost) => {
            res.json(dbPost);
        });
        db.Child.update(
            { chosen: true },
            { where: { id: req.body.receivingChildID } }
        ).then((dbDonation) => {
            res.json(dbDonation);
        });
    });
    return router;
};
