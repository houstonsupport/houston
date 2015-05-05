var dataHelper = {

	getUserName: function(userID){
		var user = app.users.get(userID);
		var username = 'Unknown User';
		if(typeof user !== "undefined"){
			if(user.attributes.firstName){
				userName = user.attributes.firstName+' '+user.attributes.lastName;
			} else {
				userName = user.attributes.emailAddress;
			}
		}
		return userName;
	},

	getCompanyName: function(userID){
		var user = app.users.get(userID);
		var companyName = 'Unknown Company';
		if(typeof user !== "undefined"){				
			if(user.attributes.clientID){
				companyName = app.clients.get(user.attributes.clientID).attributes.name;
			} else {
				companyName = app.user.attributes.companyName;
			}
		}
		return companyName;
	},

	getUserRole: function(userID){
		var user = app.users.get(userID);
		var userRole = 'Unknown Role';
		if(typeof user !== "undefined"){
			var userRole = user.attributes.role;
		} 
		return userRole;
	},

	getUserAvatar: function(userID){
		var user = app.users.get(userID);
		var avatar = '/application/assets/img/avatar.png';
		if(typeof user !== "undefined"){
			if(user.attributes.avatar) avatar = user.attributes.avatar;
		} 
		return avatar;
	}

}

var handlebarsHelpers = {
	bindHelpers: function(){
		//stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
		Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		if(v1 === v2) {
			return options.fn(this);
		}
			return options.inverse(this);
		});

		Handlebars.registerHelper("forEach",function(arr,options) {
			return houston.forEach(arr, options);
		});		
		
		Handlebars.registerHelper("fullHeightPage", function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});

		Handlebars.registerHelper("getUserName", function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserName(authorID));
		});

		Handlebars.registerHelper("getUserRole", function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserRole(authorID));
		});

		Handlebars.registerHelper("getCompanyName", function(authorID) {
			return new Handlebars.SafeString(dataHelper.getCompanyName(authorID));
		});

		Handlebars.registerHelper("getUserAvatar", function(authorID) {
			return new Handlebars.SafeString(dataHelper.getUserAvatar(authorID));
		});

		Handlebars.registerHelper("convertToClass", function(attribute) {
			return houston.convertToClass(attribute);
		});

		Handlebars.registerHelper("convertToDate", function(attribute) {
			return houston.convertToDate(attribute);
		});

// if(!type.indexOf('pdf') == -1) 
		Handlebars.registerHelper("isPDF", function(type, data) {
			return new Handlebars.SafeString('<object data="/api/tickets/file/inline/'+ data +'" type="application/pdf" width="100%" height="100%" frameborder="0"> alt : <a href="/api/tickets/file/'+ data +'">test.pdf</a> </object>');
		});

		//TicketsView Helpers
		Handlebars.registerHelper("updateCheck", function(arr) { 
			return new Handlebars.SafeString(houston.updateCheck(arr));			
		});

		Handlebars.registerHelper("dateArrow", function() {
			return new Handlebars.SafeString(houston.dateArrow());
		});

		Handlebars.registerHelper("companyArrow", function() {
			return new Handlebars.SafeString(houston.companyArrow());	
		});

		//TicketView Helpers		
		Handlebars.registerHelper("populateAgentDropdown", function(){
			return new Handlebars.SafeString(houston.populateAgentDropdown());
		});
		
		Handlebars.registerHelper("convertToDateTime", function(attribute) {
			return houston.convertToDateTime(attribute);
		});
		
		Handlebars.registerHelper("generateDropSwitch", function(attribute) {
			return new Handlebars.SafeString(houston.generateDropSwitch(attribute));
		});

		Handlebars.registerHelper("outputMarkAsCompleted", function(attribute) {
			if(app.user.get('role') !== "USER"){
				return new Handlebars.SafeString('<input id="completed" type="checkbox" name="ticket-completed" value="completed" /><label for="completed">Mark ticket as completed</label>');
			}
		});

		//TicketView Helpers
		Handlebars.registerHelper("downloadTicketAttachments", function(attribute) {
			if(attribute.length > 1) {
				var params = "";
				attribute.forEach(function(file) {
					params += "id[]="+file.ref+"&";
				});
				params = params.substring(0, params.length -1);
				return new Handlebars.SafeString('<a class="attachments-link" data-bypass="true" href="http://edd.houston.com/api/tickets/file/zip?'+params+'">Download All Attachments</a>');
			}
		});

		//FileUploadView Helpers
		Handlebars.registerHelper("showFileUploadPreviewLink", function(type, target, cid){ 
			if(!target) return;
			if(houston.isDisplayableImage(type)){
				return new Handlebars.SafeString('<a data-cid="'+cid+'" class="file-preview">Preview</a>');
			}
		});

		Handlebars.registerHelper("formatFileType", function(type){
		    if(!type) return;
			return new Handlebars.SafeString(houston.formatFileType(type));
		});

		//FilePreviewView Helpers
		Handlebars.registerHelper("generateFilePreviousLink", function(index){
			if(index > 0){
				return new Handlebars.SafeString('<a class="prev" data-index="'+index+'"><i class="icon-angle-circled-left"></i></a>');
			} 
		});

		Handlebars.registerHelper("generateFileNextLink", function(index, length){
			if((length - 1) > index){
				return new Handlebars.SafeString('<a class="next" data-index="'+index+'"><i class="icon-angle-circled-right"></i></a>');
			}
		});

		Handlebars.registerHelper("maxHeightImg", function() {
			return new Handlebars.SafeString(houston.previewImageResize());
		});	

		Handlebars.registerHelper("maxWidthImg", function() {
			return new Handlebars.SafeString(houston.previewImageResizeWidth());	
		});

	}
}

var events = {
	pageResize: function(){
		$('.box-app').css('min-height', houston.calculateBoxHeight());
	},

	imgMaxHeight: function(){
		this.$('.preview-img').css('max-height', houston.previewImageResize());
	},

	// pdfSize: function(){
	// 	this.$('.img-wrap').css('height', houston.previewImageResize());
	// 	this.$('.img-wrap').css('width', houston.previewImageResizeWidth());
	// },

	bindEvents: function(){

		$(window).on("resize", events.pageResize).on("resize", events.imgMaxHeight);

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

		$('.log-out').click(function(){
			houston.createModal({type: 'Warning', message: 'Are you sure you would like to log out?', cancel: true},
		    	function(){
					window.location.href = 'http://' + window.location.hostname + '/logout';
				}
		    );
		});

		//artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
		//stackoverflow.com/questions/7310230/backbone-routes-without-hashes
		// All navigation that is relative should be passed through the navigate
		// method, to be processed by the router. If the link has a `data-bypass`
		// attribute, bypass the delegation completely.
		$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
		  // Get the absolute anchor href.
		  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		  // Get the absolute root.
		  var root = location.protocol + "//" + location.host + app.root;

		  // Ensure the root is part of the anchor href, meaning it's relative.
		  if (href.prop.slice(0, root.length) === root) {
		    // Stop the default event to ensure the link will not cause a page
		    // refresh.
		    evt.preventDefault();

		    // `Backbone.history.navigate` is sufficient for all Routers and will
		    // trigger the correct events. The Router's internal `navigate` method
		    // calls this anyways.  The fragment is sliced from the root.
		    Backbone.history.navigate(href.attr, true);
		  }
		});
	}
}