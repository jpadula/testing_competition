'use strict';

// Configuring the Competitions module
angular.module('competitions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Competitions', 'competitions', 'dropdown', '/competitions(/create)?',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'competitions', 'Show Competitions', 'competitions');
		Menus.addSubMenuItem('topbar', 'competitions', 'New Competition', 'competitions/create');
		
		// My Competitions for User
		Menus.addMenuItem('topbar', 'My Competitions', 'my_competitions', 'item', '/competitions(/create)?',true,["user"]);
		//Menus.addSubMenuItem('topbar', 'my_competitions', 'See Competitions List', 'my_competitions');

	}
]);