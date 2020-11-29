import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function() {
  Accounts.onCreateUser((options, user) => {
    const { google } = user.services;
    if (google) {
      const { email } = google;
      const existingUser = Accounts.findUserByEmail(email);
      if (existingUser) {
        // link existing user to google service
        Meteor.users.update({ _id: existingUser._id }, {
          $set: {
            'services.google': google,
          },
        });
        // then abort the user creation
        throw new Meteor.Error('account_linked', 'Compte enllaçat correctament, si us plau torna a iniciar sessió.');
      }
    }
    return user;
  });
});

ServiceConfiguration.configurations.upsert(
  {
    service: "google",
  },
  {
    $set: {
      appId: Meteor.settings.google.appId,
      secret: Meteor.settings.google.secret,
      loginStyle: "popup",
    },
  }
);
