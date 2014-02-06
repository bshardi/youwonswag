Notifications = new Meteor.Collection("notifications");

Notifications.allow({
	update: ownsDocument
});

createWinnerNotification = function(attendee){
		Notifications.insert({
			userId: attendee.userId,
			meetingId: attendee.meetingId,
			meetingName: attendee.meetingName,
			meetingCode: attendee.meetingCode,
			read: false
		});
	}	
