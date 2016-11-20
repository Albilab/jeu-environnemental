import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import './method.js';

export const Chats = new Mongo.Collection('chat');

//Schema de Chats
Chats.schema = new SimpleSchema({
  text: {type: String},
  createdAt: {type: Date},
  owner: {type: String},
  username: {type: String},
  channel : {type: String}
});



