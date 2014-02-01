Meteor.publish("meetings", function() {
	return Meetings.find({userId: this.userId});
});

Meteor.publish("openMeetings", function() {
	return Meetings.find({active: true, open: true});
});

Meteor.publish("singleMeeting", function(id){
	return id && Meetings.find(id);
});

Meteor.publish("attendees", function(meetingId) {
	return Attendees.find({meetingId: meetingId});
})