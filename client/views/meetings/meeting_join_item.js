Template.meetingJoinItem.helpers({
	hasJoinedMeeting: function() {
		return !Attendees.findOne({meetingId: this._id});
	}
});

Template.meetingJoinItem.events({
	"click .join-meeting": function(e){
		e.preventDefault();
		Meteor.call("joinMeeting", this._id);
	},
	"click .leave-meeting": function(e){
		e.preventDefault();
		if (confirm("Leave this meeting?")) {
    		Meteor.call("leaveMeeting", this._id);}
	}
});