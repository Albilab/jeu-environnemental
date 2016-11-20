// Route publique

var publicRoutes = FlowRouter.group({

});

publicRoutes.route('/', {
	names : 'accueil',
	action(params, queryParams){
		BlazeLayout.render("layout", {corps: "accueil"});
	}	
});