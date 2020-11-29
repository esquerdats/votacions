import { Meteor } from 'meteor/meteor';
import { Votes } from '../votes.js';

Meteor.publish('votes.all', function () {
  return Votes.find();
});

Meteor.publish('votes.mine', function() {
  return Votes.find({ userId: this.userId });
})