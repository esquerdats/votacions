import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.siteName = "Esquerdats";
Accounts.emailTemplates.from = "Esquerdats <contacte@esquerdats.cat>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "AGO 04/12/20 Confirma el teu compte";
  },
  text(user, url) {
    return `Verifica el teu correu fent clic en el següent enllaç: ${url}`;
  },
};

Accounts.config({
  sendVerificationEmail: true,
})

Meteor.startup(function () {
  Accounts.onCreateUser((options, user) => {
    const { google } = user.services;
    if (google) {
      const { email } = google;
      const existingUser = Accounts.findUserByEmail(email);
      if (existingUser) {
        // link existing user to google service
        Meteor.users.update(
          { _id: existingUser._id },
          {
            $set: {
              "services.google": google,
            },
          }
        );
        // then abort the user creation
        throw new Meteor.Error(
          "account_linked",
          "Compte enllaçat correctament, si us plau torna a iniciar sessió."
        );
      }
    }
    return user;
  });
  Accounts.validateLoginAttempt(({ type, user }) => {
    if (type === 'password' && user) {
      if (!user.emails[0].verified) {
        throw new Meteor.Error("verify_email", "Si us plau verifica el teu compte fent clic al link que t'hem enviat al correu electrònic.")
      }
    }
    return true;
  })
});

Meteor.publish('users.me', function() {
  return Meteor.users.find({ _id: this.userId })
})
