var ModalView = Backbone.View.extend({
	className: 'modal-window-inner',
	template: JST.modalview,
	render: function(){
		this.$el.html(this.template(this.model.attributes));

		this.delegateEvents({
			'click .confirm': 'confirm',
			'click .btn-can': 'cancel'
		});
		
		app.modalWindow.show();
	},

	initialize: function(){
		_.bindAll(this, 'keyEvent');
		$(document).bind('keydown', this.keyEvent);
	},

	onClose: function(){
		$(document).unbind('keydown', this.keyEvent);
		app.modalWindow.hide();
		app.modal = false;
	},

	keyEvent: function(e){
		var keyCode = e.which;
		if(keyCode == 27){
			this.cancel();
		} else if (keyCode == 13){
			this.confirm();
		}
	},

	cancel: function(){
		if(this.cancelBehaviour) this.cancelBehaviour();
		this.close();	

		// Render preview window if exists
		if(app.preview){
			app.modalWindow.html(app.preview.$el);
			app.preview.render();
		}	
	},

	confirm: function(){
		if(this.confirmBehaviour) this.confirmBehaviour();
		this.close();

		// Close preview window if exists
		if(app.preview){
			app.preview.close();
		}	
	}
});