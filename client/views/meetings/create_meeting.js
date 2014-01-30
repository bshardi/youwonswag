Template.createMeeting.events({
  "submit form": function(e) {
    e.preventDefault();

    var meeting = {
      name: $(e.target).find("[name=name]").val(),
      meetingCode: $(e.target).find("[name=meetingCode]").val().toLowerCase(),
    }

    Meteor.call("createMeeting", meeting, function(error, id) {
      if (error) {
        //display the error to the user
        throwError(error.reason);
      } else {
        Router.go("meetingsList");
      }
    });
  }
});