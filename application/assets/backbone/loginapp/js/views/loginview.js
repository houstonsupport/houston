var LoginView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="box box-wel">'+
			'<h2>Welcome to Houston</h2>'+
			'<h3 class="wel-tag">Super-fast, easy to use frontline support</h3>'+
				'<h3>Get Houston!</h3>'+
				'<a href="/register">Try Houston for 60 days, absolutely free!</a>'+
		'</div>'+
		'<div id="login-form-wrap">'+

		'</div>'+
		'<div class="box box-try">'+
			'<h2>Try Houston</h2>'+
			'<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>'+
			'<a class="btn" href="/register">Lets Go</a>'+
		'</div>'
	),

	passReset: false,
	render: function (){
		var formView;

		this.$el.html(this.template());

		if(!this.passReset){
			formView = new LoginFormView();
		} else {
			formView = new ResetPassView();
		}

		this.showForm(formView);
		
		return this;
	},

	currentView: false,
	showForm: function(view) {
		if (this.currentView) this.currentView.close();

		this.currentView = view;
		this.$el.find('#login-form-wrap').append(this.currentView.$el);
		this.currentView.render();
	}	
});