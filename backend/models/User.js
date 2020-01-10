const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const User = new Schema({
  email: String,
  name: String,
  phoneNumber: String,
  address: String
});

User.statics.create = function(email, name, phoneNumber, address) {
  const user = new this({
    email,
    name,
    phoneNumber,
    address
  });

  return user.save();
};

User.statics.findOneByEmail = function(email) {
  return this.findOne({
    email
  }).exec();
};

User.statics.findAll = function() {
  return this.find().exec();
}

User.statics.deleteUserById = function(id) {
  return this.findOneAndDelete({ id: id }).exec();
}

User.statics.updateAddressById = function(id, address) {
  return this.findOneAndUpdate({ id: id }, { $set: { address } });
}

autoIncrement.initialize(mongoose.connection);
User.plugin(autoIncrement.plugin, {
  model: "User",
  field: "id",
  startAt: 1  
});
module.exports = mongoose.model("User", User);
