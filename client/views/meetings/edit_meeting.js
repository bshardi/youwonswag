Template.editMeeting.events({
  "submit form": function(e) {
    e.preventDefault();

    var currentMeetingId = this._id;

    var meetingFields = {
      name: $(e.target).find("[name=name]").val(),
      meetingCode: $(e.target).find("[name=meetingCode]").val().toLowerCase(),
    }

    Meteor.call("editMeeting", currentMeetingId, meetingFields, function(error, id) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go("meetingPage", {_id: currentMeetingId});
      }
    });
  }
});