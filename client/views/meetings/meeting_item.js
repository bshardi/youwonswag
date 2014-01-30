Template.meetingItem.helpers({
	isActive: function() {
		return this.active ? "Meeting is active" : "Meeting is archived";
	},
	isOpen: function() {
		return this.open ? "Open to Attendees" : "Meeting is closed";
	},
	openMeetingText: function() {
		return this.open ? "Close meeting" : "Open Meeting";
	}
});

Template.meetingItem.events({
	"click .open-meeting": function(e){
		e.preventDefault();
		Meteor.call("toggleMeetingOpen", this._id);
	}
});