var ClientModel = Backbone.Model.extend({
	urlRoot: '/api/clients',
	initialize: function(){
		// Create usersCollection
		this.usersCollection = new ClientUsers();
		// this.usersCollection = new ClientUsers(app.users.usersByClient(this.id)); //Removed as now clientUsers are fetched in app.fetchClients
	},
	
	parse: function(response){
		if(response._id){
			response.id = response._id['$id'];
			delete response._id;
		}
		return response;
	}
});
