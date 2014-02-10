Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	waitOn: function() {
		return Meteor.subscribe("notifications");
	}
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
		data: function(){
			var meeting = Meetings.findOne({_id: this.params._id});
			if (meeting.userId !== Meteor.user()._id) {
				this.render("accessDeniedNotOwner");
				this.stop();
			} else {
				return meeting;
			}
		}
	});

	this.route("meetingsJoin", {
		path: "/join",
		waitOn: function() {return [Meteor.subscribe("openMeetings"), 
			Meteor.subscribe("meetingsJoined")];}
	});

	this.route("meetingPublicView", {
		path: "meeting/view/:meetingCode",
		waitOn: function(){
			return Meteor.subscribe("meetingByCode", this.params.meetingCode);
		},
		data: function(){
			return Meetings.findOne({meetingCode: this.params.meetingCode});
		}
	});

	this.route("createMeeting", {
  		path: "/createmeeting",
    	disableProgress: true
	});

	this.route("editMeeting", {
		path: "/meeting/:_id/edit",
		waitOn: function() {
			return Meteor.subscribe("singleMeeting",this.params._id);
		},
		data: function() {
			var meeting = Meetings.findOne({_id: this.params._id});
			if (meeting.userId !== Meteor.user()._id) {
				this.render("accessDeniedNotOwner");
				this.stop();
			} else {
				return meeting;
			}
		}
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
};

Router.before(requireLogin, {only: ["createMeeting", "editMeeting", "meetingsList", "meetingsJoin", "meetingPage"]});
Router.before(function() { clearErrors() });