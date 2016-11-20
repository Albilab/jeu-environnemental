import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats } from '../chats.js';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('chats.list', function chatsPublication() {
    return Chats.find();
  });
}