Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading"
});

Router.map(function() {
	this.route("home", {
		path: "/",
		disableProgress: true
	});

	this.route("about", {path: "/about",disableProgress: true});

	this.route("meetingsList", {
		path: "/meetings",
		waitOn: function() {return Meteor.subscribe("meetings");}
	});

	this.route("meetingsJoin", {
		path: "/join",
		waitOn: function() {return Meteor.subscribe("openMeetings");}
	});

	this.route("createMeeting", {
  		path: "/createmeeting",
    	disableProgress: true
	});
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render("loading")
    else
      this.render("accessDenied");
    this.stop();
  }
}
Router.before(requireLogin, {only: ["createMeeting", "meetingsList"]});
Router.before(function() { clearErrors() });