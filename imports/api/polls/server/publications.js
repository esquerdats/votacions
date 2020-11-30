import { Meteor } from 'meteor/meteor';
import { Polls } from '../polls.js';

Meteor.publish('polls.all', function () {
  if (!Meteor.user().isAdmin) {
    return [];
  }
  return Polls.find();
});

Meteor.publish('polls.open', function () {
  return Polls.find({ open: true });
});