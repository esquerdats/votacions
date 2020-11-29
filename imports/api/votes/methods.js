import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Polls } from '../polls/polls.js';
import { Votes } from './votes.js';

Meteor.methods({
  'votes.insert'(pollId, option) {
    check(pollId, String);
    check(option, String);

    const poll = Polls.findOne({ _id: pollId });
    if (!poll?.open) {
      throw new Meteor.Error('poll-closed', 'Aquesta votació està tancada.');
    }

    return Votes.insert({
      userId: this.userId,
      pollId,
      option,
    });
  },
  'votes.remove'(pollId) {
    return Votes.remove({
      userId: this.userId,
      pollId: pollId,
    });
  },
});
