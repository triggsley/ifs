/**
 * Created by triggsley on 12/12/2016.
 * tutorial : https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);