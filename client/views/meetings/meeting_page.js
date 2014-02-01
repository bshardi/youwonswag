Template.meetingPage.helpers({
	openMeetingText: function() {
		return this.open ? "Close meeting" : "Open Meeting";
	},
	attendees: function() {
		return Attendees.find();
	}
});