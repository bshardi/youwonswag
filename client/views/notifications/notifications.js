Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({read: false});
  },
  notificationCount: function(){
      return Notifications.find({read: false}).count();
  }
});

Template.notification.helpers({
  notificationMeetingPath: function() {
    return Router.routes.meetingPage.path({_id: this.meetingId});
  }
})

Template.notification.events({
  'click a': function(e) {
    e.preventDefault();
    Notifications.update(this._id, {$set: {read: true}});
  }
})