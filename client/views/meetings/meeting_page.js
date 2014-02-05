Template.meetingPage.helpers({
	openMeetingText: function() {
		return this.open ? "Close meeting" : "Open Meeting";
	},
	activeMeetingText: function() {
		return this.active ? "Archive meeting" : "Restore meeting"
	},
	meetingOpenStatus: function() {
		return this.open ? "Status: Open" : "Status: Closed"
	},
	meetingActiveStatus: function() {
		return this.active ? "" : "Archived Meeting"
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
	},
	"click .open-meeting": function(e){
		e.preventDefault();
		console.log(this._id+this.open);
		Meteor.call("toggleMeetingOpen", this._id, this.open, function(error, id) {
			if (error) throwError(error.reason);
		});
	},
	"click .archive-meeting": function(e){
		e.preventDefault();
		Meteor.call("toggleMeetingActive", this._id, this.active, function(error, id) {
			if (error) throwError(error.reason);
		});
	}
});