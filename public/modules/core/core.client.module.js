'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

function hasRol(rol,roles) {
	var result = false;
	for (var i = roles.length - 1; i >= 0; i--) {
		if (roles[i]===rol){
			result = true;
			break;
		}
	};
	return result;
}

angular.module('core').run(function (Authentication, $q, Permission) {
	var roles = Authentication.user.roles;
	Permission
	//for admin
    .defineRole('user', function (stateParams) {
		return hasRol("user",roles);
	})
    //for admin
    .defineRole('admin', function (stateParams) {
		return hasRol("admin",roles);
	});
});