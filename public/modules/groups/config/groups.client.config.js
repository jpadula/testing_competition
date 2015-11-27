'use strict';

// Configuring the Groups module
angular.module('groups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*
		Menus.addMenuItem('topbar', 'Groups', 'groups', 'dropdown', '/groups(/create)?',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'groups', 'Show Groups', 'groups');
		Menus.addSubMenuItem('topbar', 'groups', 'New Group', 'groups/create');
		*/
	}
]);