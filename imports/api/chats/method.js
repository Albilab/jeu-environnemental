import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats } from './chats.js';

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