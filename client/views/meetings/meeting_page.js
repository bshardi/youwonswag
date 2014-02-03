Template.meetingPage.helpers({
	openMeetingText: function() {
		return this.open ? "Close meeting" : "Open Meeting";
	},
	attendees: function() {
		return Attendees.find();
	}
});

Template.meetingPage.events({
	"click .remove-attendee": function(e){
		e.preventDefault();
		if (confirm("Do you want to remove this attendee?")){
			Meteor.call("removeAttendee", this.meetingId, this._id);
		}
	}

});