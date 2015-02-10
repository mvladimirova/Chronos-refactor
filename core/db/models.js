"use strict";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var eventSchema = new Schema({
    admins: [Schema.Types.ObjectId],
    name: String,
    place: {
        type: 'String',
        coordinates:  [Number]
    },
    timeCard:{
        start: Date,
        end: Date,
        Schedule: Object
    },
    subscribedUsers: [Schema.Types.ObjectId],
    groupRestriction: [Schema.Types.Number],
    Tags:[String]
});

// The admin property can be added only through the mongo terminal
var userSchema = new Schema({
  userName: {type: String, required: true, unique: true },
  email:{ type: String, required: true, unique: true },
  name: {
      firstName: String,
      lastName: String
  },
  password: {
      password: String,
      salt: String
  },
  createdOn: { type: Date, default: Date.now },
  groups: [Number]
});

var groupSchema = new Schema({
    _id: String,
    users: [String]
});

var gallerySchema = new Schema({
    event: Schema.Types.ObjectId,
    name: String,
    Split: {
        partNumber: Number,
        TotalParts: Number
    },
    Image: { data: Buffer, contentType: String }
});

module.exports.event = mongoose.model('event', eventSchema);
module.exports.user = mongoose.model('user', userSchema);
module.exports.group = mongoose.model('group', groupSchema);
module.exports.gallery = mongoose.model('gallery', gallerySchema);