var MessageModel = Backbone.Model.extend({
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
	if(response.ticketID['$id']){
		response.ticketID = response.ticketID['$id'];
	}
	if(response.authorID['$id']){
		response.authorID = response.authorID['$id'];
	}
		return response;
	}
});