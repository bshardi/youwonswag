

Template.meetingJoinItem.events({
	"click .join-meeting": function(e){
		e.preventDefault();
		Meteor.call("joinMeeting", this._id);
	}
});