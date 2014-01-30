Template.meetingsList.helpers({
	meetings: function() {
	 	return Meetings.find();
	}
});