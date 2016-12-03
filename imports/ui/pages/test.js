import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './test.html';

import { Chats } from '/imports/api/chats/chats.js'

Template.test.events({
    'click .action-1': function(event) {
        var timerMax = 60000;
        var periode = 100;
        var now, before = new Date();
        var nbrPeriode = 0;
        var nbrMaxPeriode = timerMax/periode;

        Meteor.call('timers.launch', 1, timerMax ,function(error, result){
            console.log("Call1 : "+result);
            var time = Math.round(+new Date()/1000);
            console.log("Timers.launch 1 appelé = "+time);
        });

        var pourcentageEvolution = Meteor.setInterval(function() {
            now = new Date();
            var pourcentage = ((nbrPeriode*periode)/timerMax)*100;
            var elapsedTime = (now.getTime() - before.getTime());
            if(elapsedTime > nbrMaxPeriode){
                //Recover the motion lost while inactive.
                nbrPeriode += Math.floor(elapsedTime/periode);
            } else {
                nbrPeriode++;
            }
            $('.pourcentage-1').css('width',pourcentage+'%');
            $('.pourcentage-numerique-1').text(Math.round(pourcentage)+'%');
            if(nbrPeriode > nbrMaxPeriode){
                Meteor.clearInterval(pourcentageEvolution);
            } else {
                // UI Modification
                $('.timer-1').text(((timerMax-(nbrPeriode*periode))/1000)+'s');
            }
            before = new Date();   
        }, periode);
    },
    'click .action-2': function(event) {
        var timerMax = 30000;
        var periode = 100;
        var nbrPeriode = 0;
        var nbrMaxPeriode = timerMax/periode;
        Meteor.call('timers.launch', 2, timerMax ,function(error, result){
            //console.log("Call2 : "+ result);
            var time = Math.round(+new Date()/1000);
            console.log("Timers.launch 2 appelé = "+time);
        });

        var pourcentageEvolution = Meteor.setInterval(function(){
            var pourcentage = ((nbrPeriode*periode)/timerMax)*100;
            $('.pourcentage-2').css('width',pourcentage+'%');
            $('.pourcentage-numerique-2').text(Math.round(pourcentage)+'%');
            $('.timer-2').text(((timerMax-(nbrPeriode*periode))/1000)+'s');
            if(nbrPeriode >= nbrMaxPeriode){
                Meteor.clearInterval(pourcentageEvolution);
                var time2 = Math.round(+new Date()/1000);
                console.log('Chargement 2 Fini = '+time2);
                $('.notification-2').text('Cest fini');
            } else {
                nbrPeriode++;
            }
        }, periode);
    },
    'submit form.connexion': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if(error){
                
            } else {
                //FlowRouter.go("/");
                console.log('Utilisateur connecté');
            }
        });
    },
    'submit form.register': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var usernameVar = event.target.registerUsername.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar,
            username: usernameVar
        }, function (error){
            if(error){ // Il y a eu une erreur lors de l'inscription
                console.log(error);
            } else { // l'utilisateur a été créé
                console.log("Utilisateur créé");
            }
        });
    },
    'keypress .chat-text': function (evt) {
        if (evt.which === 13) {
            const target = evt.target;
            Meteor.call('chats.insert', target.value, "general" ,function(error, result){
                target.value="";
            });
        }
    }

});

Template.test.helpers({
  chats() {
    return Chats.find({});
  }
})

Template.test.helpers({
  timeView(dateTime) {
    return dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
  }
})

Template.test.onCreated(function() {
    this.autorun(() => {
        this.subscribe('chats.list');
    });
});



