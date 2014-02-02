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

	this.route("meetingPage", {
		path: "/meeting/:_id",
		waitOn: function() {
			return [Meteor.subscribe("singleMeeting", this.params._id), 
			  Meteor.subscribe("attendees", this.params._id)];
		},
		data: function(){ return Meetings.findOne({_id: this.params._id});}
	});

	this.route("meetingsJoin", {
		path: "/join",
		waitOn: function() {return [Meteor.subscribe("openMeetings"), 
			Meteor.subscribe("meetingsJoined")];}
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