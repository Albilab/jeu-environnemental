import { Template } from 'meteor/templating';

import './layoutGame.html';

Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go("/");
    }
});

Template.layout.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
})