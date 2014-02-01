Attendees = new Meteor.Collection("attendees");

Meteor.methods({
	joinMeeting: function(meetingId) {
		var user = Meteor.user();
		var meeting = Meetings.findOne({_id: meetingId});
		var attendee = Attendees.findOne({meetingId: meetingId, userId: user._id});

		if (!user)
      		throw new Meteor.Error(401, "You need to login to make comments");
      	if (!meeting)
      		throw new Meteor.Error(404, "This meeting is no longer available");
      	if (!meeting.active || !meeting.open)
      		throw new Meteor.Error(422, "This meeting is not accepting new members");
      	if (attendee)
      		throw new Meteor.Error(422, "You are already attending this meeting");

      	attendee = {
      		meetingId: meeting._id,
      		meetingName: meeting.name,
      		meetingCode: meeting.meetingCode,
      		userId: user._id,
      		userName: user.username,
      		userEmail: user.emails[0].address,
      		submitted: new Date().getTime()
    	};

    	Meetings.update(meeting._id, {$inc: {attendeeCount: 1}});

    	attendee._id = Attendees.insert(attendee);
    	return attendee._id;
	},
	leaveMeeting: function(meetingId) {

	}
});