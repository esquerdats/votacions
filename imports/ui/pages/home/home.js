import { Meteor } from 'meteor/meteor';

import '../../components/polls/polls.js';
import '../../components/polls-admin/polls-admin.js';
import '../../components/login/login.js';

import './home.html';

Template.home.onCreated(function () {
  Meteor.subscribe('users.me');
});

Template.home.events({
  'click #logout': function(event) {
    Meteor.logout()
  },
});

Template.home.helpers({
  isAdmin() {
    return !!Meteor.user().isAdmin;
  }
})