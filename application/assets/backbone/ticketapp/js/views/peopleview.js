var PeopleView = Backbone.View.extend({
	template: Handlebars.compile(		
		'<div class="box-app-fixed">'+
			'<div class="box-app-fixed-inner">'+
				'<div class="box-app-top">'+
					'<h2>People</h2>'+
					'<a class="btn new-client" data-form="1">New Client</a>'+
					'<a class="btn" data-form="0">New Agent</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="box-app box-people" style="{{fullHeightPage}}">'+
			'<div id="agent-stream">'+
			'<h2>Support Agents</h2>'+
				'<ul>'+
				'{{#each models}}'+
					'<li class="person">'+
						'{{#ifCond attributes.verify true}}'+					
							'<img class="avatar" src="{{#if attributes.avatar}}{{attributes.avatar}}{{else}}application/assets/img/avatar.png{{/if}}" alt="{{attributes.firstName}} {{attributes.lastName}}" />'+
							'<h3>{{#if attributes.firstName}}{{attributes.firstName}} {{attributes.lastName}}{{else}}{{attributes.emailAddress}}{{/if}}</h3>'+
							'<h4>{{attributes.role}}</h4>'+
						'{{else}}'+
							'<img class="avatar" src="application/assets/img/avatar.png" />'+
							'<h3>{{attributes.emailAddress}}</h3>'+
							'<h4>Awaiting Verification</h4>'+
						'{{/ifCond}}'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</div>'+
			'<h2 class="people-clients-header">Clients</h2>'+
			'<div id="clients-wrap">'+	

			'</div>'+
		'</div>'			
	),
	
	initialize: function() {		
		this.listenTo(this.collection, "add change remove", this.render);
		this.listenTo(app.users, "sync", this.render);
		this.collection.view = this;
		this.clientsView = new ClientsView({collection: app.clients}); 

        _.bindAll(this, 'keyEvent');
        $(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		this.stopListening();
		this.clientsView.close();
	},
		
	render: function() {
		this.$el.html(this.template(this.collection));	
		this.$('#clients-wrap').append(this.clientsView.render().$el); 
		this.delegateEvents({
			'click .btn':'setupForm',
			'click .new-client-user': 'setupForm',
			'click .edit-client': 'setupForm',
			'click button.btn-can': 'cancelForm',
			'click .agent-button': 'validateAgent',
			'click .client-button': 'addClient',
			'click .user-button': 'validateUser',
			'click .edit-client-button': 'editClient',
			'input input': 'markAsChanged',
			'keydown': 'keyEvent'
		});
		return this;		
	},

    keyEvent: function(e){
    	if(!this.formActive) return;
        var keyCode = e.which;
		if(keyCode == 13){
			e.preventDefault();
			this.keyFormHandler();
		} else if (keyCode == 27){
			this.cancelForm();
		}
    },

	keyFormHandler: function(){
		var button = this.$el.find('.confirm');
		var input = this.$el.find('form input');
		if(button.hasClass('user-button')){
			this.validateUser(input);
		} else if (button.hasClass('agent-button')) {
			this.validateAgent(input);
		} else if (button.hasClass('client-button')) {
			this.validateClient(input);
		}

	},    

	formData: [
		['Add New Agent','To add a new agent, simply input their email address and Houston will do the rest. Simple!', 'Email Address', 'agent-button'],
		['Add New Client', 'To add a new client, simply add the client\'s name below.', 'Client Name', 'client-button'],
		['Add New %ClientName% User', 'To add a new user to %ClientName%, simply input their email address and Houston will do the rest. Simple!', 'Email Address', 'user-button'],
		['Edit %ClientName%\'s name', 'To edit %ClientName%\'s name simply enter the amended name below.', 'New Name', 'edit-client-button']
	],

	setupForm: function(e){
		var input = $(e.currentTarget);
		var formData = input.data('form');
		var modelData = input.data('model');
		var form = this.$el.find('#modal-form');
		
		//Add client name to formData if adding a User
		if(modelData) {
			var clientName = app.clients.get(modelData).attributes.name;
			var formHeader = this.formData[formData][0].replace('%ClientName%', clientName);
			var formMessage = this.formData[formData][1].replace('%ClientName%', clientName);

			form.find('h3').text(formHeader);
			form.find('h4').text(formMessage);

			form.find('input').attr('data-model', modelData);

		} else {
			form.find('h3').text(this.formData[formData][0]);
			form.find('h4').text(this.formData[formData][1]);
		}

		form.find('input').attr('placeholder', this.formData[formData][2]);
		form.find('.confirm').addClass(this.formData[formData][3]);

		this.showForm();
	},

	formActive: false,

	showForm: function(){
		this.$el.find('#modal-form').show();
		this.formActive = true;
	},

	cancelForm: function(){
		var form = this.$el.find('#modal-form');
		form.find('.modal-buttons').removeClass('validated-input-resize');
		form.find('.confirm').removeClass('agent-button client-button user-button edit-client-button');
		form.hide().find('input').val('');
		this.formActive = false;
	},

	validateClient: function(){
		var input = this.$el.find('form input');
		var name = input.val();
		var nameInUse = false;

		if(!name) return; 

		app.clients.each(function(model){
			if(name.toLowerCase() == model.attributes.name.toLowerCase()){
				nameInUse = true;
			}
		});

		if(nameInUse) {
			this.validateFail(input);
			return false;
		} else {
			return input;
		}	
	},

	addClient: function(e) {
		var input = $(this.validateClient());
		var name = input.val();
		if(!name) return;

		var attributes = { "name": name };

		app.addClientModel.save(attributes,{
			success: _.bind(function(model){
				app.addClientModel.clear();
				app.changed = false;
			}, this)
		});

	},	

	editClient: function(e) {
		var input = $(this.validateClient());
		var name = input.val();
		if(!name) return;

		var clientID = input.data('model');
		var client = app.clients.get(clientID);
		var attributes = { "name": name };

		client.save(attributes,{
			success: _.bind(function(model){
				app.changed = false;
				app.clients.sort();
			}, this)
		});

	},	

	validateAgent: function(){
		var input = this.$el.find('form input');
        houston.validateAndApproveEmail(input,this.addAgent, this.validateFail);
	},

	validateUser: function(){
		var input = this.$el.find('form input');
        houston.validateAndApproveEmail(input, this.addUser, this.validateFail);
	},

    validateFail: function(input){
        var div = input.closest('div');
        div.addClass('validated-input-resize');      
    },

	addAgent: function(input) {
		var attributes = 
			{
				"emailAddress": input.val(),
				"verify": false
			};

		app.addAgentModel.save(attributes,{
			success: _.bind(function(model){

				app.addAgentModel.clear();
		    	app.changed = false;
			}, this)
		});
	},

	addUser: function(input) {
		var clientID = input.data('model');
		var attributes = 
			{
				"emailAddress": input.val(),
				"clientID": clientID
			};

		app.addClientUserModel.save(attributes,{
			success: _.bind(function(model){
				app.addClientUserModel.clear();
				app.changed = false;
			}, this)
		});
	}
	
});