import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.siteName = "Esquerdats";
Accounts.emailTemplates.from = "Esquerdats <contacte@esquerdats.cat>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Confirma el teu compte";
  },
  text(user, url) {
    return `Hola,\n\nSi us plau confirma el teu compte fent clic en el següent enllaç:\n\n${url}\n\nGràcies\n\nColla Castellera de l'Esquerra de l'Eixample`;
  },
};

Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Restableix la teva contrasenya";
  },
  text(user, url) {
    return `Hola,\n\nPots restablir la teva contrasenya fent clic al següent enllaç:\n\n${url}\n\nGràcies\n\nColla Castellera de l'Esquerra de l'Eixample`;
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
        throw new Meteor.Error("verify_email", "Si us plau verifica el teu compte fent clic a l'enllaç que t'hem enviat al correu electrònic.")
      }
    }
    return true;
  })
});

Meteor.publish('users.me', function() {
  return Meteor.users.find({ _id: this.userId })
})
