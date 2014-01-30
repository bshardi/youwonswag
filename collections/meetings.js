Meetings = new Meteor.Collection("meetings");

Meetings.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meetings.deny({
  update: function(userId, meeting, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, "name", "meetingCode").lenght > 0);
  }
});

Meteor.methods({
  createMeeting: function(meetingAttributes) {
    var user = Meteor.user(),
      meetingWithSameCode = Meetings.findOne({meetingCode: meetingAttributes.meetingCode});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a new meeting");

    // ensure the meeting has a name
    if (!meetingAttributes.name)
      throw new Meteor.Error(422, "Please fill in a name for your meeting");

  	if(!meetingAttributes.meetingCode)
  		throw new Meteor.Error(422, "Your meeting needs a code.")

    // check that there are no previous posts with the same link
    if (meetingAttributes.meetingCode && meetingWithSameCode) {
      throw new Meteor.Error(302, 
        "This meeting code is already in use, please pick another.", 
        meetingWithSameCode._id);
    }

    // pick out the whitelisted keys
    var meeting = _.extend(_.pick(meetingAttributes, "name", "meetingCode"), {
      userId: user._id, 
      owner: user.username, 
      submitted: new Date().getTime(),
      active: true,
      open: false,
      attendeeCount: 0,
    });

    var meetingId = Meetings.insert(meeting);

    return meetingId;
  },
  toggleMeetingOpen: function(meetingId){
    var user = Meteor.user();
    //ensure the user is logged in
    if (!user) throw new Meteor.Error(401, "You need to login to upvote");

    Meetings.update({
      _id: meetingId,
    }, {
      $set: {open: !this.open}
    });
  
  }

});