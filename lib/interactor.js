'use strict';

var Q = require('q');

module.exports = (function() {
	var interactor = {
				newClient: {
					handler: function() {
						return Q({data: [
							{
								query: 'First Name',
								slug: 'first-name',
								type: 'text'
							},
							{
								query: 'Last Name',
								slug: 'last-name',
								type: 'text'
							},
							{
								query: 'Email',
								slug: 'email',
								type: 'email'
							},
							{
								query: 'Select the type of issue:',
								slug: 'issue-type',
								type: 'radio',
								options: ['Lawsuit', 'Contract', 'Divorce']
							},
							{
								query: 'Describe your issue',
								slug: 'issue-description',
								type: 'text'
							}
						]});
					}
				}
			};
	return interactor;
})();
