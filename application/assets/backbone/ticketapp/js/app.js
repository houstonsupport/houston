//danialk.github.io/blog/2013/06/08/backbone-tips-after-and-before-methods-for-router/
//www.developphp.com/video/JavaScript/Custom-Confirm-Box-Programming-Tutorial
//lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
var AppRouter = Backbone.Router.extend({
	routes: {
		"": "indexFrontController",
		"tickets/new": "ticketFormFrontController",
		"tickets/:ticket": "ticketDetailsFrontController",
		"people": "peopleOverviewFrontController",
		"account": "accountMainFrontController",
		"analytics": "analyticsMainFrontController"
	},

	initialize: function() {
		// Add dataTransfer to jquery events
		jQuery.event.props.push("dataTransfer");

		// Check for File API support
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) console.warn('The File API is not fully supported by this browser');

		// AUTHENTICATED SESSION USER MODEL
		this.user = new UserModel();
		
		// USERS COLLECTION
		this.users = new Users();
		
		//----------------------------------------
	
		// TICKETS COLLECTION
		this.tickets = new Tickets();
		
		// TICKET MODEL
		this.ticketDetailModel = new TicketDetailModel();
			
		//----------------------------------------
		
		// CLIENTS COLLECTION
		this.clients = new Clients();

		// AGENTS COLLECTION
		this.agentsCollection =  new Backbone.Collection();

		//FILESUPLOAD COLLECTION
		this.filesUploadCollection = new FilesUpload();

		//FILEPREVIEW COLLECTION
		this.filesPreviewCollection = new FilesPreview();
		
		// BUFFER CLIENT MODEL
		this.addClientModel = new BufferClientModel();
		
		// BUFFER CLIENT USER MODEL
		this.addClientUserModel = new BufferClientUserModel();
		
		// BUFFER AGENT MODEL
		this.addAgentModel = new BufferAgentModel();

		//BUFFER MESSAGE MODEL
		this.addMessageModel = new BufferMessageModel();

		$.when(this.user.fetch(), this.users.fetch(), this.tickets.fetch(), this.clients.fetch())
		.done(function(){
			app.setUpSocket();
			app.initViews();
		});

	},

	setUpSocket: function(){
		// Connect to namespaced socket using company ID
		var socket = io('http://houstonsupportdesk.com:3000/'+app.user.attributes.companyID);
		// On receiving a notify event display the notification popup
		socket.on('notify', function(data) {	
			$('#notice span').html(data);
			$('#notice').fadeIn(1000, function() { $(this).delay(5000).fadeOut(1000); });
			socket.emit('response', 'success');

			app.tickets.fetch({reset:true});
		});
		
	},

	viewInit: false,
	initViews: function() {
		// TICKETS VIEW
		this.ticketsView = new TicketView({collection: this.tickets.filtered});
		
		// TICKET VIEW
		this.ticketDetailView = new TicketDetailView({model: this.ticketDetailModel});

		// NEW TICKET VIEW
		this.formView = new FormView({model: new TicketModel()});
		
		//----------------------------------------
		
		// PEOPLE VIEW
		this.peopleView = new PeopleView({collection: this.agentsCollection}); 

		// CLIENTS VIEW
		this.clientsView = new ClientsView({collection: this.clients});
		
		// ANALYTICS VIEW
		this.analyticsView = new AnalyticsView({model: this.user});
		
		// ACCOUNT VIEW
		this.accountView = new AccountView({model: this.user});

		// PREVIEW WINDOW
		this.previewWindow = new PreviewWindow({collection: app.filesPreviewCollection});

		// UPDATE ALERT VIEW 
		this.updateAlertView = new UpdateAlertView({collection: this.tickets});

		// MODAL WARNING VIEW
		this.modalView = new ModalView({model: new Backbone.Model()});

		handlebarsHelpers.bindHelpers();

		//EVENTS
		$(window).on("resize", this.ticketsView.pageResize).on("resize", this.previewWindow.imgMaxHeight);

		//Mobile menu
		$('.nav-icon, .mob-menu a').click(function(){
			$('.outer-wrap, .mob-menu').fadeToggle(300);
			$('.nav-icon').toggleClass('cross');
			// $('body').toggleClass('dark');
		});
		
		// Close notification popup
		$('#notice .close').click( function() {
			$(this).parent().hide();
		});

		this.viewInit = true;
	},
	
	onLoadRender: function(view) {
		var _this = this;
					
		(function check() {
			if(_this.viewInit) {
				$('#app').html(_this[view].render().el);
				$('#preview-window').append(app.previewWindow.$el);
				$('#modal-window').append(app.modalView.$el);
				$('#update-alert').append(app.updateAlertView.$el);
				app.updateAlertView.render();
				clearTimeout(timer);
			} else {
				var timer = setTimeout(check, 50);	
			}
		})();
	},

	// Define controllers
	indexFrontController: function() {
		this.onLoadRender('ticketsView');
	},

	ticketDetailsFrontController: function(ticket) {
		var attributes = this.tickets.get(ticket).attributes;
		this.ticketDetailView.model.set(attributes);
		this.ticketDetailView.model.fetchMessages(ticket);
		// app.onLoadRender('ticketDetailView');
	},

	ticketFormFrontController: function() {
		this.onLoadRender('formView');
	},
	
	peopleOverviewFrontController: function() {
		this.onLoadRender('peopleView');
	},
	
	accountMainFrontController: function() {
		this.onLoadRender('accountView');
	},
	
	analyticsMainFrontController: function() {
		this.onLoadRender('analyticsView');
	},

	changed: false,
	createUnsavedChangesModal: function () {
		if(!this.changed) return true;
		this.modalView.model.set({type: 'Warning', message: 'Any unsaved changes will be lost, would you like to continue?', cancel: true});
		this.modalView.render();
		return false;
	},

	executeArguments: false,
	execute: function(callback, args, name) {
	    //If nothing has been changed  and no arguments have been set then continue with execute as normal
	    if(this.createUnsavedChangesModal() && !this.executeArguments){
	    	if (callback) callback.apply(this, args);
	    //If something has been changed and arguments have been previously set by an attempted execute use the arguments
		} else if (!this.changed && this.executeArguments){
			this.executeArguments.callback.apply(this, this.executeArguments.args);
	    	this.executeArguments = false;
	    //If something has changed set the arguments to global variables to be use in the future 
	    } else {
	    	this.executeArguments = {
		    	callback: callback,
		    	args: args,
		    	name: name
		    }
	    }
    }

});

var app = new AppRouter();

$(function() { Backbone.history.start(); });