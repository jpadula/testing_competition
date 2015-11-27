'use strict';

// Configuring the Competitions module
angular.module('competitions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Admin', 'competitions', 'dropdown','',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'competitions', 'Show Competitions', 'competitions');
		Menus.addSubMenuItem('topbar', 'competitions', 'New Competition', 'competitions/create');

		Menus.addSubMenuItem('topbar', 'competitions', 'Show Groups', 'groups');
		Menus.addSubMenuItem('topbar', 'competitions', 'New Group', 'groups/create');
		
		Menus.addSubMenuItem('topbar', 'competitions', 'Logs', 'logs');
		
		// My Competitions for User
		Menus.addMenuItem('topbar', 'Competitions', 'my_competitions', 'dropdown','',true,["user"]);
		Menus.addSubMenuItem('topbar', 'my_competitions', 'Show Competitions', 'my_competitions');

	}
]);