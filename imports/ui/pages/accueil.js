import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './accueil.html';

Template.accueil.onRendered(function() {
    (function($){
      $(function(){
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
      }); // end of document ready
    })(jQuery); // end of jQuery name space
});




