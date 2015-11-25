'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

function hasRol(rol,roles) {
	var result = false;
	if (roles){
		for (var i = roles.length - 1; i >= 0; i--) {
			if (roles[i]===rol){
				result = true;
				break;
			}
		};
	}
	return result;
}

angular.module('users').run(function (Authentication, $q, Permission) {
	var roles = Authentication.user.roles;
	//window.location.reload();
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