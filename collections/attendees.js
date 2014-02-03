Attendees = new Meteor.Collection("attendees");

Meteor.methods({
	joinMeeting: function(meetingId) {
		var user = Meteor.user();
		var meeting = Meetings.findOne({_id: meetingId});
		var attendee = Attendees.findOne({meetingId: meetingId, userId: user._id});

		if (!user)
      		throw new Meteor.Error(401, "You need to login to join a meeting");
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
          winner: false,
      		submitted: new Date().getTime()
    	};

    	Meetings.update(meeting._id, {$inc: {attendeeCount: 1}});

    	attendee._id = Attendees.insert(attendee);
    	return attendee._id;
	},
	leaveMeeting: function(meetingId) {
    var user = Meteor.user();
    var meeting = Meetings.findOne({_id: meetingId});
    var attendee = Attendees.findOne({meetingId: meetingId, userId: user._id})

    if (!user)
          throw new Meteor.Error(401, "You need to login to leave this meeting");
    if (!meeting)
          throw new Meteor.Error(404, "This meeting is no longer available");
    if (!meeting.active || !meeting.open)
          throw new Meteor.Error(422, "This meeting is not accepting new members");
    if (!attendee)
      throw new Meteor.Error(422, "You are already not attending this meeting");

    Meetings.update(meeting._id, {$inc: {attendeeCount: -1}});
    Attendees.remove(attendee._id);
	},
  removeAttendee: function(meetingId,attendeeId) {
    var user = Meteor.user();
    var meeting = Meetings.findOne(meetingId);
    var attendee = Attendees.findOne(attendeeId);
    
    if (!user)
          throw new Meteor.Error(401, "You need to login to remove this attendee");
    if (!meeting)
          throw new Meteor.Error(404, "This meeting is no longer available");
    if (!meeting.active)
          throw new Meteor.Error(422, "Archived meetings cannot be edited");
    if (!attendee)
      throw new Meteor.Error(422, "This attendee has already left this meeting");

    Meetings.update(meeting._id, {$inc: {attendeeCount: -1}});
    Attendees.remove(attendeeId);
  }
});