import { Polls } from '/imports/api/polls/polls.js';
import { Votes } from '/imports/api/votes/votes.js';
import { Meteor } from 'meteor/meteor';
import './polls-admin.html';

Template.pollsAdmin.onCreated(function () {
  Meteor.subscribe('polls.all');
  Meteor.subscribe('votes.all');
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
  voteCounts(pollId) {
    const counts = {};
    Votes.find({ pollId }).forEach((vote) => {
      counts[vote.option] = 1 + (counts[vote.option] || 0);
    });
    return Object.keys(counts).map(option => ({
      option,
      count: counts[option],
    })).sort((a, b) => b.count - a.count);
  },
});
