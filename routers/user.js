/**
 * Created by boot on 9/17/16.
 */
var Service = require('../services/user_service');
var service = new Service(db);
var router = require('express').Router();

var getMyProfile = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find profile with accessToken=' + accessToken);
    service.getProfileByAccessToken(accessToken).then(profile => {
        console.log('found profile: ' + JSON.stringify(profile));
        res.send(profile);
    }).catch(error => res.sendStatus(401));
};

var updateProfile = function(req, res) {
    var accessToken = req.query.accessToken;
    var profile = req.body;
    console.log('update profile with accessToken=' + accessToken + " - profile= " + JSON.stringify(profile));
    service.updateProfile(accessToken, profile).then(profile => {
        console.log('profile updated: ' + JSON.stringify(profile));
        res.send(profile);
    }).catch(error => res.sendStatus(401));
};

router.get('/profile/me', getMyProfile);
router.put('/profile/me', updateProfile);

module.exports = router;