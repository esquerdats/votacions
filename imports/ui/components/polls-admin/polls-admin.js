import { Polls } from '/imports/api/polls/polls.js';
import { Meteor } from 'meteor/meteor';
import './polls-admin.html';

Template.pollsAdmin.onCreated(function () {
  Meteor.subscribe('polls.all');
});

Template.pollsAdmin.events({
  'click .toggle': function() {
    Meteor.call('polls.update', { _id: this._id }, { $set: { open: !this.open } }, (error) => {
      if (error) {
        alert(error.error);
      }
    });
  }
})

Template.pollsAdmin.helpers({
  polls() {
    return Polls.find();
  },
});
