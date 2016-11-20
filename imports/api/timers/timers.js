import { Meteor } from 'meteor/meteor';

Meteor.methods({
	'timers.launch'(id, temps){
		var time = Math.round(+new Date()/1000);
		console.log("Debut de l'action "+id+" = "+time);
		var idSetTimeout = Meteor.setTimeout(function(){
			var time2 = Math.round(+new Date()/1000);
			console.log("Action terminé "+id+" = "+time2);
		}, temps);
		//console.log(idSetTimeout);
		//return idSetTimeout;
	}
});