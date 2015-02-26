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
	}

}

var handlebarsHelpers = {
	bindHelpers: function(){
		
		Handlebars.registerHelper("fullHeightPage", function() {
			return new Handlebars.SafeString('min-height:' + houston.calculateBoxHeight() +'px;');
		});

		Handlebars.registerHelper("forEach",function(arr,options) {
			return houston.forEach(arr, options);
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

		Handlebars.registerHelper("convertToClass", function(attribute) {
			return houston.convertToClass(attribute);
		});

		Handlebars.registerHelper("convertToDate", function(attribute) {
			return houston.convertToDate(attribute);
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

	}
}