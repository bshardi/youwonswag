Meteor.publish("meetings", function() {
	return Meetings.find({userId: this.userId});
});

Meteor.publish("openMeetings", function() {
	return Meetings.find({active: true, open: true});
});

Meteor.publish("singleMeeting", function(id){
	return id && Meetings.find(id);
});

Meteor.publish("meetingByCode", function(meetingCode) {
	return meetingCode && Meetings.find({meetingCode: meetingCode});
});

Meteor.publish("attendees", function(meetingId) {
	return Attendees.find({meetingId: meetingId});
});

Meteor.publish("meetingsJoined", function() {
	return Attendees.find({userId: this.userId});
});

Meteor.publish("notifications", function() {
	return Notifications.find({userId: this.userId});
});