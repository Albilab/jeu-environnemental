import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/accueil.js';

// Route publique

var publicRoutes = FlowRouter.group({

});

publicRoutes.route('/', {
	names : 'accueil',
	action(params, queryParams){
		BlazeLayout.render("layout", {corps: "accueil"});
	}	
});