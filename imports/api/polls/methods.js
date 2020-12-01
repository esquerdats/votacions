import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Polls } from './polls.js';

Meteor.methods({
  'polls.insert'(question, options) {
    check(question, String);
    check(options, [String]);

    if (!Meteor.user()?.admin) {
      throw new Meteor.Error('401', 'Has de ser admin per crear votacions.');
    }

    return Polls.insert({
      question,
      options,
      open: false,
    });
  },
  'polls.update'(selector, modifier) {
    return Polls.update(selector, modifier);
  },
});
