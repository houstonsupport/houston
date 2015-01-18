var ClientsView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box-companies-header">'+
			'<h2>Clients</h2>'+
			'<a class="btn">New Client</a>'+
		'</div>'+
		'<div id="company-stream">'+
			'<div class="add-person add-client">'+
				'<form id="form-add-client">'+
					'<h4>To add a new client, simply add the client\'s name below.</h4>'+
					'<input type="text" placeholder="Clients Name" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'<ul id="clients-stream">'+
	
			'</ul>'+
		'</div>'
	),

	initialize: function() {	

		this.listenTo(this.collection, 'sync', this.render);	
		
		_.bindAll(this, "renderClient");

		this.addClientModel = new ClientModel();
		this.addClientModel.view = this;
	},

	renderClient: function(model) {
		var clientView = new ClientView({model: model});
		this.$el.find('#clients-stream').append(clientView.$el);
		clientView.render();
	},

	render: function() {
		this.$el.html(this.template());	
		this.collection.each(this.renderClient);
		this.delegateEvents({
			'click .box-companies-header .btn':'addToggle',
			'click .add-client .cancel-btn':'addToggle',
			'click #form-add-client button': 'addClient'
		});
		return this;
	},

	addToggle: function() {
		this.$el.find('.add-client').slideToggle().find('input[type="text"]').focus();
	},


	addClient: function(e) {
		console.log(this.collection);
		var name = this.$el.find('#form-add-client input[type="text"]').val();
		var attributes = 
			{
				"name": name
			}


		this.addClientModel.save(attributes,{
			success: _.bind(function(model){
				this.addClientModel.clear();
			}, this)
		});
	}

});



var ClientView = Backbone.View.extend({
	tagName: "li",
	template: Handlebars.compile(
		'<div class="company-info">'+
			'<h3>{{attributes.name}}</h3>'+
			'<a>Edit</a>'+
			'<a class="new-client-user">New User</a>'+
		'</div>'+
		'<div class="client-stream">'+
			'<div class="add-person add-client-user">'+
				'<form class="form-add-client-user">'+
					'<h4>To add a new user, simply input their email address and Houston will do the rest. Simple!</h4>'+
					'<input type="text" placeholder="Email Address" />'+
					'<button type="button">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+
			'<ul class="client-user-stream">'+

			'</ul>'+
		'</div>'
	),	

	initialize: function(){

		this.listenTo(this.model, "sync", this.render);

		//new model
		this.addClientModel = new ClientUserModel();
		//give model reference to this view
		this.addClientModel.view = this;

		var usersCollection = new Users();
		usersCollection.url = '/client/users/' + this.model.id 
		this.usersView = new UsersView({ collection: usersCollection});
		this.usersView.parent = this;

		//Bind event to fetch users
		this.listenTo(this.model, "sync", this.usersView.collection.fetch());
	},

	render: function(){
		this.$el.html(this.template(this.model));

		this.delegateEvents({
			'click .new-client-user':'addToggle',
			'click .add-client-user .cancel-btn':'addToggle',			
			'click .form-add-client-user button': 'addUser'
		});
	},

	addToggle: function() {
		this.$el.find('.add-client-user').slideToggle().find('input[type="text"]').focus();
	},

	addUser: function() {
		console.log('addingUser')
		var emailAddress = this.$el.find('.form-add-client-user input[type="text"]').val();
		var clientID = this.model.id;
		var attributes = 
			{
				"emailAddress": emailAddress,
				"clientID": clientID

			}

		this.addClientModel.save(attributes,{
			success: _.bind(function(model){
				this.addClientModel.clear();
			}, this)
		});

	}

});

var UsersView = Backbone.View.extend({

	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render);	
		
		_.bindAll(this, "renderUser");
	},

	renderClient: function(model) {
		var clientView = new ClientView({model: model});
		this.$el.find('#clients-stream').append(clientView.$el);
		clientView.render();
	},

	renderUser: function(model) {
		var userView = new UserView({model: model}); 
		this.parent.$el.find('.client-user-stream').append(userView.$el); //find from the parentViews $el
		userView.render();
	},

	render: function(){
		this.collection.each(this.renderUser);
		return this;
	}

});

var UserView = Backbone.View.extend({
	tagName: "li",
	className: "person",
	template: Handlebars.compile(
			'{{#if attributes.password}}'+					
				'<img class="avatar" src="{{#if attributes.avatar}}{{avatar}}{{else}}application/assets/img/avatar.png{{/if}}" />'+
				'<h3>{{attributes.firstName}} {{attributes.lastName}}</h3>'+
				'<h4>Support Agent</h4>'+
			'{{else}}'+
				'<img class="avatar" src="application/assets/img/avatar.png" />'+
				'<h3>{{attributes.emailAddress}}</h3>'+
				'<h4>Awaiting Verification</h4>'+
			'{{/if}}'
	),

	initialize: function(){

	},

	render: function(){
		this.$el.html(this.template(this.model));
	}

});