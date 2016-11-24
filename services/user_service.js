/**
 * Created by boot on 9/17/16.
 */
var q = require('q');
var request = require('request');
function UserService(db) {
    this.getUserById = function(userId) {
        var def = q.defer();
        db.User.findOne({_id: userId}, function(err, user) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;
    };
    this.getUserByAccessToken = function(accessToken) {
        var def = q.defer();
        request.get({
            url: config.accounts_host + 'user?accessToken=' + accessToken,
        }, function(error, response, body) {
            if (error || response.statusCode == 401) {
                def.reject(body);
            } else {
                def.resolve(JSON.parse(body));
            }
        });
        return def.promise;
    };
    this.getProfileByAccessToken = function(accessToken) {
        return this.getUserByAccessToken(accessToken).then(user => {
            user.profile.roles = user.role;
            return user.profile;
        });
    };
    this.updateProfile = function(accessToken, profile) {
        var def = q.defer();
        this.getUserByAccessToken(accessToken)
            .then(user => this.getUserById(user._id))
            .then(user => {
                delete profile.roles;
                user.profile = profile;
                user.update(user, err => {
                    if (err) {
                        def.reject(err);
                    } else {
                        user.profile.roles = user.role;
                        def.resolve(user.profile);
                    }
                });
            });
        return def.promise;
    };
};

module.exports = UserService;
