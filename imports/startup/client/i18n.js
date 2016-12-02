import { TAPi18n } from "meteor/tap:i18n";

getUserLanguage = function () {
  // Put here the logic for determining the user language

  return "fr";
};

Meteor.startup(function () {
  TAPi18n.setLanguage(getUserLanguage())
    .done(function () {
      console.log("Langue parametré");
    })
    .fail(function (error_message) {
      // Handle the situation
      console.log(error_message);
    });
});