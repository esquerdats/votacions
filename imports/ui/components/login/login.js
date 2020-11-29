import { Meteor } from 'meteor/meteor';
import './login.html';

Template.login.events({
  'click #login-google': function() {
    Meteor.loginWithGoogle(function(error) {
      if (error) {
        alert(error.reason);
      }
    });
  },
  'submit #login': function(event, template) {
    event.preventDefault();
    const email = template.find('#email').value;
    const password = template.find('#password').value;
    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        if (error.error === 400) {
          alert('Introdueix el teu correu i contrasenya.');
        } else if (error.error === 403) {
          alert('El correu o la contrasenya són incorrectes.');
        } else {
          alert(error.reason);
        }
      }
    });
  },
  'click #signup': function(_, template) {
    const email = template.find('#email').value
    const password = template.find('#password').value
    Accounts.createUser({
      email,
      password
    }, function(error) {
      if (error) {
        if (error.error === 400) {
          alert('Introdueix un correu i una contrasenya.');
        } else if (error.error === 403) {
          alert('Ja existeix un compte amb aquest correu!');
        } else {
          alert(error.reason);
        }
      }
    });
  },
  'click #forgot-password': function(_, template) {
    const email = template.find('#email').value
    Accounts.forgotPassword({ email }, function(error) {
      if (error) {
        if (error.error === 400) {
          alert('Introdueix el teu correu al camp de correu electrònic.');
        } else {
          alert(error);
        }
      } else {
        alert(`T'hem enviat un correu per restablir la contrasenya a ${email}`);
      }
    });
  }
});
