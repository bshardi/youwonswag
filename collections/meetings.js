Meetings = new Meteor.Collection("meetings");

Meetings.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Meetings.deny({
  update: function(userId, meeting, fieldNames) {
    //may only edit the following fields:
    return (_.without(fieldNames, "name", "meetingCode", "instructions", "location").lenght > 0);
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
    var meeting = _.extend(_.pick(meetingAttributes, "name", "meetingCode", "instructions", "location"), {
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
  editMeeting: function(meetingId, meetingFields) {
    var user = Meteor.user(),
      meetingWithSameCode = Meetings.findOne({meetingCode: meetingFields.meetingCode, _id: {$ne: meetingId}});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a meeting");

    // ensure the meeting has a name
    if (!meetingFields.name)
      throw new Meteor.Error(422, "Please fill in a name for your meeting");

    if(!meetingFields.meetingCode)
      throw new Meteor.Error(422, "Your meeting needs a code.")

    // check that there are no previous posts with the same link
    if (meetingFields.meetingCode && meetingWithSameCode) {
      throw new Meteor.Error(302, 
        "This meeting code is already in use, please pick another.", 
        meetingWithSameCode._id);
    }

    Meetings.update(meetingId, {$set: meetingFields});

  },
  toggleMeetingOpen: function(meetingId, currentState){
    var user = Meteor.user();
    //ensure the user is logged in
    if (!user) throw new Meteor.Error(401, "You need to login to change this meeting");

    Meetings.update({
      _id: meetingId,
    }, {
      $set: {open: !currentState}
    });  
  },
  toggleMeetingActive: function(meetingId, currentState){
    var user = Meteor.user();
    if (!user) throw new Meteor.Error(401, "You need to login to change this meeting");

    Meetings.update({_id: meetingId},{$set: {active: !currentState}});
  }

});