import { Polls } from '/imports/api/polls/polls.js';
import { Votes } from '/imports/api/votes/votes';
import { Meteor } from 'meteor/meteor';
import './polls.html';

Template.polls.onCreated(function () {
  Meteor.subscribe('polls.open');
  Meteor.subscribe('votes.mine');
});

Template.polls.events({
  'click .vote': function(event) {
    const pollId = this._id;
    const option = event.target.getAttribute('option');
    Meteor.call('votes.insert', pollId, option, (error) => {
      if (error) {
        alert(error.reason);
      }
    });
  },
  'click .remove-vote': function(event) {
    const pollId = this._id;
    const option = event.target.getAttribute('option');
    Meteor.call('votes.remove', pollId, (error) => {
      if (error) {
        alert(error.reason);
      }
    });
  }
});

Template.polls.helpers({
  hasPolls() {
    return Polls.find({ open: true}).count() > 0;
  },
  polls() {
    return Polls.find({ open: true });
  },
  hasVoted(pollId) {
    return Votes.find({ userId: Meteor.userId(), pollId }).count() > 0;
  },
  vote(pollId) {
    return Votes.findOne({ userId: Meteor.userId(), pollId }).option
  }
});
