this["JST"] = this["JST"] || {};

this["JST"]["loginformview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Login Here</h2>\n<h3 class=\"log-tag\">Great to see you again!</h3>\n<form id=\"form-log\">\n	<input class=\"required\" type=\"email\" name=\"log-e\" placeholder=\"Email Address\" autofocus spellcheck=\"false\" />\n	<input class=\"required\" type=\"password\" name=\"log-p\" placeholder=\"Password\" />\n	<label>\n		<input id=\"log-rem\" type=\"checkbox\" name=\"log-r\" value=\"remember\" />\n		Remember me on this computer\n	</label>\n	<button class=\"login\" type=\"button\">\n		<span>Sign In</span>\n		<img class=\"svg-dots\" src=\"/application/assets/img/three-dots.svg\" width=\"52\" alt=\"Loading\">\n	</button>		\n</form>\n<h3 class=\"ib\">Help!</h3>&nbsp;\n<a class=\"forgot\">Ive forgotten my password</a>";
},"useData":true});

this["JST"]["loginview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-wel\">\n	<h2>Welcome to Houston</h2>\n	<h3 class=\"wel-tag\">Super-fast, easy to use frontline support</h3>\n	<h3>Get Houston!</h3>\n	<a href=\"/register\">Try Houston for 60 days, absolutely free!</a>\n</div>\n<div id=\"login-form-wrap\">\n</div>\n<div class=\"box box-try\">\n	<h2>Try Houston</h2>\n	<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>\n	<a class=\"btn\" href=\"/register\">Lets Go</a>\n</div>";
},"useData":true});

this["JST"]["paymentview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-reg\">\n	<div class=\"payment-header\">\n		<h2><span>Enter Your Payment Details</span></h2>\n		<h3><span>Almost got your Houston account!</span></h3>\n	</div>\n	<div class=\"payment-form-wrap\">\n	<div class=\"payment-houston\"></div>\n		<form id=\"form-payment\" action=\"\">\n			<span class=\"payment-errors\"></span>\n			<div class=\"card-front\">\n				<div class=\"form-row\">\n					<label for=\"card-number\">Card Number</label>\n					<input id=\"card-number\" type=\"text\" maxlength=\"20\" data-stripe=\"number\" />			\n				</div>	\n				<div class=\"form-row expiration-date\">\n					<label for=\"expiration-month\">Expiration Date</label>\n					<input id=\"expiration-month\" type=\"text\" maxlength=\"2\" data-stripe=\"exp-month\" placeholder=\"MM\"/>		\n					<input type=\"text\" maxlength=\"4\" data-stripe=\"exp-year\" placeholder=\"YYYY\"/>\n				</div>\n				<div class=\"form-row\">\n					<label for=\"cardholder-name\">Cardholder Name</label>\n					<input id=\"cardholder-name\" type=\"text\" />			\n				</div>\n			</div>\n			<div class=\"card-back\">\n				<div class=\"form-row\">\n					<label for=\"cvc\">CVC/CVV</label>\n					<input id=\"cvc\" type=\"text\" maxlength=\"4\" data-stripe=\"cvc\" />\n					<div>\n						<span>The last </span>\n						<span>3 or 4 digits </span>\n						<span>on back </span>\n						<span>of the card</span>\n					</div>			\n				</div>'\n			</div>\n			<div class=\"payment-buttons\">\n				<button class=\"payment-confirm\" type=\"button\">\n					<span>Confirm</span>\n					<img class=\"svg-dots\" src=\"/application/assets/img/three-dots.svg\" width=\"52\" alt=\"Loading\">\n				</button>\n				<div class=\"beige or\">or</div>\n				<a class=\"btn-can payment-back\">Back</a>\n			</div>\n			<div class=\"powered-by-stripe\"></div>\n		</form>\n	</div>\n</div>";
},"useData":true});

this["JST"]["paymentviewsuccess"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-suc\">\n	<h2>You Have a Houston Account!</h2>\n	<h3>Hoot have thought it would be so easy?</h3>\n	<div class=\"got-wrap\">\n		<h2>You\\'ve Got Mail!</h2>\n		<h3>Please click the verification link in the email we just sent you to complete your account creation</h3>\n	</div>\n</div>";
},"useData":true});

this["JST"]["planview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"box box-reg\">\n	<div class=\"box-plan\">\n		<h2><span>Choose a Pricing Plan</span></h2>\n		<h3><span>After your 60 day free trial which pricing plan suits you best "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "?</span></h3>\n		<div class=\"pricing-plan left-plan\">\n			<div class=\"vld-cir\">1</div>\n			<div class=\"price\">£99.99</div>\n			<h3>Unlimited Access<br />Annually</h3>\n			<button class=\"plan-select\" type=\"button\" data-plan=\"1\">Select</button>\n		</div>\n		<div class=\"svg-wrapper\">\n			<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 943.6 1025.2\">\n				<g id=\"owl\">\n					'<path fill=\"#9B8D75\" d=\"M785.9 788.2c39.7-76.1 62.8-167.4 62.8-265.6 0-85.3-17.5-165.3-48-234.8 0 0-18.4-219.8 8.2-271.4 25.3-49-108.5 23.5-147.7 68.1-42-36.9-111.1-61.1-189.3-61.4h-1.2c-78.2.2-147.3 24.4-189.3 61.4-39.3-44.5-173-117.1-147.7-68.1 26.6 51.6 8.2 271.4 8.2 271.4-30.6 69.4-48 149.5-48 234.8 0 98.2 23.2 189. 62.8 265.6-29.4 20.9-46.2 45.1-46.2 70.8 0 79.9 161.2 144.6 360.2 144.9h1.2c199-.3 360.2-65 360.2-144.9 0-25.7-16.8-49.9-46.2-70.8z\"/>\n					'<path class=\"right-wing\" fill=\"#CFC3AF\" d=\"M926.7 659.5c-23.9-146.9-64.2-262.6-90.1-258.4-.2 0-.5.2-.7.2-.9-.1-1.7-.4-2.7-.3-.1 0-.3-.1-.4-.1-3.2-.2-6.4 1.3-9.6 4.3-26.7 17.5-65.6 89.5-95.3 180.3-36 109.8-44.9 205.4-20 213.6 15.3 5 39.7-24.1 64.6-72.6 2.3 91.6 16.5 157.4 36.7 158.4 16.5.8 33-41.3 44.7-105.9 22.6 93.5 49. 157.1 69.2 153.9 25.9-4 27.5-126.5 3.6-273.4z\"/>\n					'<path class=\"left-wing\" fill=\"#CFC3AF\" d=\"M16.9 659.5C40.8 512.6 81.2 396.9 107 401.1c.2 0 .5.2.7.2.9-.1 1.7-.4 2.7-.3.1 0 .3-.1.4-.1 3.2-.2 6.4 1.3 9.6 4.3 26.7 17.5 65.6 89.5 95.3 180.3 36 109.8 44.9 205.4 20 213.6-15.3 5-39.7-24.1-64.6-72.6-2.3 91.6-16.5 157.4-36.7 158.4-16.5.8-33-41.3-44.7-105.9-22.6 93.5-49.9 157.1-9.2 153.9-25.9-4-27.5-126.5-3.6-273.4z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M314.5 600.5c13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S601 558.2 601 536.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 1.2 25.7 16.8 63.9 38.3 63.9z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M658.1 624.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 652.2 351 630.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 312-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M658.1 718.7c-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2s-25.4-30.6-25.4-52.2c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2S351 746.2 351 724.6c0-3.2-2.6-5.9-5.9-5.9s-5.9 2.6-5.9 5.9c0 21.6-13.1 52.2-25.4 52.2-12.2 0-25.4-30.6-25.4-52.2 0-3.2-2.6-5.9-5.9-5.9-3.2 0-5.9 2.6-5.9 5.9 0 25.7 15.6 63.9 37.1 63.9 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33s24.8-15.2 31.2-33c6.4 17.7 17.6 33 31.2 33 13.6 0 24.8-15.2 31.2-33 6.4 17.7 17.6 33 31.2 33 21.5 0 37.1-38.2 37.1-63.9 1.1-3.3-1.5-5.9-4.7-5.9z\"/><ellipse fill=\"#F69328\" cx=307.1\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M330.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"365\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M388.1 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"423\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M446 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"518.4\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M541.4 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"576.3\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M599.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					<ellipse fill=\"#F69328\" cx=\"634.3\" cy=\"995.4\" rx=\"30.8\" ry=\"22.5\"/>\n					<path fill=\"#9E6F44\" d=\"M657.3 1002.1c0 10.5-23 23.1-23 23.1s-23-12.6-23-23.1 10.3-19.1 23-19.1 23 8.6 23 19.1z\"/>\n					'<path fill=\"#CFC3AF\" d=\"M642.2 95.3c-74.1 0-138.4 41.7-170.8 102.9-32.3-61.6-96.8-103.6-171.2-103.6-106.7 0-193.2 86.5-193.2 193.2C107 394.5 193.5 481 300.2 81c74.1 0 138.4-41.7 170.8-102.9 32.3 61.6 96.8 103.6 171.2 103.6 106.7 0 193.2-86.5 193.2-193.2.1-106.7-86.5-193.2-193.2-193.2z\"/>\n					<circle fill=\"#FFF\" cx=\"300.2\" cy=\"287.8\" r=\"136.6\"/>\n					<circle fill=\"#FFF\" cx=\"642.2\" cy=\"288.5\" r=\"136.6\"/>\n					<g id=\"eyes\">\n						<circle fill=\"#060707\" cx=\"310.2\" cy=\"282.8\" r=\"81.6\"/>\n						<circle fill=\"#FFF\" cx=\"291.9\" cy=\"244.5\" r=\"16.6\"/>'+				\n						<circle fill=\"#060707\" cx=\"652.2\" cy=\"283.5\" r=\"81.6\"/>\n						<circle fill=\"#FFF\" cx=\"633.8\" cy=\"245.2\" r=\"16.6\"/>\n					</g>\n					<path fill=\"#F69328\" d=\"M523.5 375.3l-51.6 89.4-51.6-89.4 26.1-6.8c16.7-4.4 34.3-4.4 51.1 0l26 6.8z\"/>\n				</g>\n			</svg>\n		</div>\n		<div class=\"pricing-plan right-plan\">\n			<div class=\"vld-cir\">2</div>\n			<div class=\"price\">£9.99</div>\n			<h3>Unlimited Access<br />Monthly</h3>\n			<button class=\"plan-select\" type=\"button\" data-plan=\"2\">Select</button>\n		</div>\n		<div class=\"plan-buttons\">\n			<button class=\"plan-confirm\" type=\"button\">Confirm</button>\n			<div class=\"beige or\">or</div>\n			<a class=\"btn-can plan-back\">Back</a>\n		</div>\n	</div>\n</div>";
},"useData":true});

this["JST"]["registerview"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "vld-a";
},"3":function(depth0,helpers,partials,data) {
    return "vld-b";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"box box-reg box-reg-form\">\n	<h2>Create an Account</h2>\n	<h3>Just this one easy form and you're done!</h3>\n	<div class=\"reg-form-wrap\">\n		<form id=\"form-reg\" action=\"\">\n			<div class=\"vld-wrap vld-pair-one "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">1</div>						\n					</div>\n				</div>\n				<input type=\"text\" id=\"first-name\" name=\"reg-fn\" placeholder=\"First Name\" class=\"vld-aa\" data-vld=\"vld-a\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.firstName : stack1), depth0))
    + "\" autofocus />\n				<input class=\"inp-spa vld-bb\" type=\"text\" name=\"reg-ln\" placeholder=\"Last Name\" data-vld=\"vld-b\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "\" />				\n			</div>\n			<div class=\"vld-wrap vld-pair-two "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.company : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">2</div>							\n					</div>\n				</div>\n				<div class=\"reg-vrf\">\n					<input type=\"email\" name=\"reg-e\" placeholder=\"Email Address\" class=\"email vld-aa\" data-vld=\"vld-a\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.emailAddress : stack1), depth0))
    + "\" spellcheck=\"false\" />\n					<div class=\"vrf\">\n						<div class=\"vrf-cir\"><i class=\"icon-cancel\"></i></div>\n						<div class=\"vrf-msg\">Already<br />In Use</div>\n					</div>\n				</div>\n				<div class=\"reg-vrf\">\n					<input class=\"inp-spa vld-bb company\" type=\"text\" name=\"reg-c\" placeholder=\"Company\" data-vld=\"vld-b\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.company : stack1), depth0))
    + "\" />\n					<div class=\"vrf\">\n						<div class=\"vrf-cir\"><i class=\"icon-cancel\"></i></div>\n						<div class=\"vrf-msg\">Already<br />In Use</div>\n					</div>\n				</div>\n			</div>\n			<div class=\"vld-wrap vld-pair-three\">\n				<div class=\"vld-box\">\n					<div class=\"vld\">\n						<div class=\"vld-line\"></div>\n						<div class=\"vld-line line-btm\"></div>\n						<div class=\"vld-cir vld-name\">3</div>\n					</div>\n				</div>\n					<div class=\"reg-vrf\">\n						<input type=\"password\" class=\"reg-p vld-aa\" name=\"reg-p\" placeholder=\"Password\" class=\"vld-aa\" data-vld=\"vld-a\" />\n						<div class=\"vrf\">\n							<div class=\"vrf-cir vrf-count\">8</div>\n							<div class=\"vrf-msg\"></div>\n						</div>				\n					</div>\n					<div class=\"reg-vrf\">\n						<input class=\"inp-lst vld-bb\" type=\"password\" name=\"register-password-confirm\" placeholder=\"Repeat Password\" data-vld=\"vld-b\" disabled=\"disabled\" />\n						<div class=\"vrf\">\n							<div class=\"vrf-cir ok\"><i class=\"icon-ok-1\"></i></i></div>\n							<div class=\"vrf-msg\"></div>\n						</div>\n					</div>\n			</div>\n			<button class=\"details-confirm\" type=\"button\">Confirm</button>\n			<div class=\"beige or\">or</div>\n			<a class=\"btn-can\" href=\"/\">Cancel</a>\n		</form>\n	</div>\n</div>";
},"useData":true});

this["JST"]["resetpassview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Reset Your Password</h2>\n<h3 class=\"pass-tag\">Out with the old in with the new!</h3>\n<form id=\"form-pass\">\n	<input class=\"required\" type=\"email\" name=\"pass-e\" placeholder=\"Email Address\" />\n	<h3>A reset link will be sent to this email address, click the link and follow the simple directions.</h3>\n	<button class=\"reset\" type=\"button\">Reset</button>\n</form>\n<div class=\"beige\">or</div>\n<a class=\"btn-can\">Cancel</a>";
},"useData":true});

this["JST"]["resetview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"box box-wel\">\n	<h2>Welcome to Houston</h2>\n	<h3 class=\"wel-tag\">Super-fast, easy to use frontline support</h3>\n		<h3>Get Houston!</h3>\n		<a href=\"/#/register\">Try Houston for 60 days, absolutely free!</a>\n</div>\n<div class=\"box box-log\">\n	<h2>Change Password</h2>\n	<h3 class=\"log-tag\">Please enter a new password below</h3>\n	<form id=\"form-pass-confirm\">\n		<div class=\"reg-vrf\">\n			<input class=\"reg-p required pass-input\" type=\"password\" name=\"pass\" placeholder=\"Password\" />\n			<div class=\"vrf\">\n				<div class=\"vrf-cir vrf-count\">8</div>\n				<div class=\"vrf-msg\"></div>\n			</div>				\n		</div>\n		<div class=\"reg-vrf\">	\n			<input class=\"inp-lst required\" type=\"password\" name=\"pass-c\" placeholder=\"Confirm Password\" />\n			<div class=\"vrf\">\n				<div class=\"vrf-cir ok\"><i class=\"icon-ok-1\"></i></i></div>\n				<div class=\"vrf-msg\"></div>\n			</div>\n		</div>'+				\n		<button class=\"reset\" type=\"button\">Confirm</button>\n		<div class=\"beige\">or</div>\n		<a href=\"/\" class=\"btn-can\">Cancel</a>\n	</form>	\n</div>\n<div class=\"box box-try\">\n	<h2>Try Houston</h2>\n	<h3>Get your clients and support team using Houston with a 60 day free trial!</h3>\n	<a class=\"btn\" href=\"/#/register\">Lets Go</a>\n</div>";
},"useData":true});