var TicketModel = Backbone.Model.extend({
	//http://backbonejs.org/#Model-idAttribute
	//https://www.google.co.uk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=backbone%20using%20mongodb%20id
	//idAttribute: "_id",
	parse: function(response){
	if(response._id){
		response.id = response._id['$id'];
		delete response._id;
	}
		return response;
	},
	urlRoot: '/tickets/add',
	defaults: {
		status: 'New',
		//agent: "Awaiting Agent",
		agent: false,
		updated: [],
		url: '/tickets/add',
		messages: []
	}
});