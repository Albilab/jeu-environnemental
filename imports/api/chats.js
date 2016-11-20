import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chat');

//Schema de Chats
Chats.schema = new SimpleSchema({
  text: {type: String},
  createdAt: {type: Date},
  owner: {type: String},
  username: {type: String},
  channel : {type: String}
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('chats.list', function chatsPublication() {
    return Chats.find();
  });
}

Meteor.methods({
  'chats.insert'(text, channel) {
    check(text, String);
    check(channel, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Chats.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      channel : channel
    });
  },
  'chats.remove'(chatId) {
    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (! this.userId && chat.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Objets.remove(objetId);
  }
});