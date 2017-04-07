import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/layouts/layoutGame.js';
import '../../ui/pages/accueil.js';
import '../../ui/pages/game.js';
import '../../ui/pages/test.js';

// Route publique

var publicRoutes = FlowRouter.group({

});

publicRoutes.route('/', {
	names : 'accueil',
	action(params, queryParams){
		BlazeLayout.render("layout", {corps: "accueil"});
	}	
});

publicRoutes.route('/game', {
	names : 'game',
	action(params, queryParams){
		BlazeLayout.render("layoutGame",{corps: "game"});
	}	
});
publicRoutes.route('/test', {
	names : 'game',
	action(params, queryParams){
		BlazeLayout.render("layoutGame",{corps: "test"});
	}	
});