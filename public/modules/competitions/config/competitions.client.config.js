'use strict';

// Configuring the Competitions module
angular.module('competitions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'admin', 'Show Competitions', 'competitions');
		Menus.addSubMenuItem('topbar', 'admin', 'New Competition', 'competitions/create');
				
		Menus.addSubMenuItem('topbar', 'admin', 'Show Groups', 'groups');
		Menus.addSubMenuItem('topbar', 'admin', 'New Group', 'groups/create');
		
		Menus.addSubMenuItem('topbar', 'admin', 'Logs', 'logs');
		
		// My Competitions for User
		Menus.addMenuItem('topbar', 'Competitions', 'my_competitions', 'dropdown', '',true,["user"]);
		Menus.addSubMenuItem('topbar', 'my_competitions', 'Show Competitions', 'my_competitions');

	}
]);