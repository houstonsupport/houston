var BufferAgentModel = Backbone.Model.extend({
	url: '/agents',
	
	initialize: function() {
		this.on("sync", function() {
			// On save of app.addAgentModel fetch users which resets the agents collection
			app.users.fetch();
		});
	},
	
	parse: function(response) {
		if(response._id) {
			response.id = response._id['$id'];
			delete response._id;
		}		
		return response;
	}
});