/**
 * Created by boot on 7/30/16.
 */
/**
 * Created by boot on 3/12/16.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntitySchema = new Schema({_id:String, name:String, scope:String, isParent:Boolean, unique: Boolean, image:String,
    type:String}, {strict: false});
var UserSchema = new Schema({_id:String, password: String, email:String, type:String, entity:String,
    role:[String], state: String, profile:{}});

var Entity = mongoose.model('Entity', EntitySchema);
var User = mongoose.model('User', UserSchema);

var db = function(credentials) {
    mongoose.connect(credentials);
    var Schema = mongoose.Schema;
    console.log('Connecting to mongodb');
    this.mongoose = mongoose;
    this.Schema = Schema;
    this.ObjectId = mongoose.Types.ObjectId;
    this.Entity = Entity;
    this.User = User;
};

process.on('exit', function() {
    console.log('Desconnecting db');
    mongoose.disconnect();
});

module.exports = db;