Template.meetingPage.helpers({
	openMeetingText: function() {
		return this.open ? "Close meeting" : "Open Meeting";
	},
	meetingStatus: function() {
		return this.active ? "Status: Open" : "Status: Closed"
	},
	attendees: function() {
		return Attendees.find();
	},
	winnerClass: function(){
		return this.winner ? "winner" : "";
	}
});

Template.meetingPage.events({
	"click .remove-attendee": function(e){
		e.preventDefault();
		if (confirm("Do you want to remove this attendee?")){
			Meteor.call("removeAttendee", this.meetingId, this._id, function(error, id){
				if (error) throwError(error.reason);
			});
		}
	},
	"click .pick-winner-btn": function(e){
		e.preventDefault();
	    Meteor.call("selectWinner", this._id, function(error, id) {
	      if (error) 
	        throwError(error.reason);
	    });
	}

});