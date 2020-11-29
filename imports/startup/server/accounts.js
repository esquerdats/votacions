Accounts.emailTemplates.siteName = "Esquerdats";
Accounts.emailTemplates.from = "Esquerdats <contacte@esquerdats.cat>";

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Gràcies per registrar-te, ${user.emails[0].address}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return "Per activar el teu compte fes clic en el següent enllaç:\n\n" + url;
};

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Confirma el teu correu";
  },
  text(user, url) {
    return `Verifica el teu correu fent clic en el següent enllaç: ${url}`;
  },
};
