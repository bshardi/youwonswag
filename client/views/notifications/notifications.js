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
    return Router.routes.meetingPublicView.path({meetingCode: this.meetingCode});
  }
})

Template.notification.events({
  'click a': function(e) {
    Notifications.update(this._id, {$set: {read: true}});
  }
})