var PeopleView = Backbone.View.extend({
	template: Handlebars.compile(
		
		'<div class="box-app-top">'+
			'<h2>Support Agents</h2>'+
			'<a class="btn">New Agent</a>'+
		'</div>'+
		'<ul id="agent-stream" class="box-app box-people">'+
			'<div class="add-person">'+
				'<form id="form-add-agent">'+
					'<input type="text" placeholder="New Agent\'s Email Address" />'+
					'<button type="submit">Submit</button>' +
					'<div class="beige or">or</div>' +
					'<a class="cancel-btn ib">Cancel</a>' +
				'</form>'+
			'</div>'+	
			'{{#each attributes.users}}'+
				'<li class="person">'+
					//'<img class="avatar" src="{{avatar}}" />'+
					'<img class="avatar" src="application/assets/img/avatar.png" />'+
					'<h3>{{name}}</h3>'+
					'<h4>Support Agent</h4>'+
					//'<h4>{{position}}</h4>'+
				'</li>'+
			'{{/each}}'+
		'</ul>'+			
			'<div class="box-companies-header">'+
				'<h2>Clients</h2>'+
				'<a class="btn">New Company</a>'+
			'</div>'+
		'<ul id="company-stream" class="box-app box-companies">'+
		'{{#each models}}'+
			'<li class="company">'+
				'<div class="company-info">'+
					'<h3>{{attributes.companyName}}</h3>'+
					'<a>Edit</a>'+
					'<a>New User</a>'+
				'</div>'+
				'<ul class="client-stream">'+
				'{{#each attributes.users}}'+
					'<li class="person">'+
						'<img class="avatar" src="{{avatar}}" />'+
						'<h3>{{name}}</h3>'+
						'<h4>{{position}}</h4>'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</li>'+
		'{{/each}}'+	
		'</ul>'
	),
	
	initialize: function() {	
		this.listenTo(this.model, "reset add remove change sort", this.render);		
	},
		
	render: function() {
		this.$el.html(this.template(this.model));	
		
		this.delegateEvents({
			'click .box-app-top .btn':'addToggle',
			'click #form-add-agent .cancel':'addToggle'
		});
		return this;		
	},

	addToggle: function() {
		this.$el.find('.add-person').slideToggle();
	}

			
});