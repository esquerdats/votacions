import './accounts-ui-overrides.html';
import { displayName, dropdown, validatePassword } from './helpers.js';
const loginButtonsSession = Accounts._loginButtonsSession;

//
// justVerifiedEmailDialog template
//

Template._justVerifiedEmailDialogOverride.events({
  'click #just-verified-dismiss-button': () =>
    loginButtonsSession.set('justVerifiedEmail', false),
});

Template._justVerifiedEmailDialogOverride.helpers({
  visible: () => loginButtonsSession.get('justVerifiedEmail'),
  displayName,
});

Template._justVerifiedEmailDialogOverride.replaces('_justVerifiedEmailDialog');

//
// resetPasswordDialog template
//

Template._resetPasswordDialog.events({
  'click #login-buttons-reset-password-button': () => resetPassword(),
  'keypress #reset-password-new-password': event => {
    if (event.keyCode === 13)
      resetPassword();
  },
  'click #login-buttons-cancel-reset-password': () => {
    loginButtonsSession.set('resetPasswordToken', null);
    if (doneCallback)
      doneCallback();
  }
});

const resetPassword = () => {
  loginButtonsSession.resetMessages();
  const newPassword = document.getElementById('reset-password-new-password').value;
  if (!validatePassword(newPassword))
    return;

  Accounts.resetPassword(
    loginButtonsSession.get('resetPasswordToken'), newPassword,
    error => {
      if (error) {
        loginButtonsSession.errorMessage(error.reason || "Unknown error");
      } else {
        loginButtonsSession.set('resetPasswordToken', null);
        loginButtonsSession.set('justResetPassword', true);
        if (doneCallback)
          doneCallback();
      }
    });
};

Template._resetPasswordDialog.helpers({
  displayName,
  inResetPasswordFlow: () => loginButtonsSession.get('resetPasswordToken'),
});

Template._resetPasswordDialogOverride.replaces('_resetPasswordDialog');

//
// justResetPasswordDialog template
//

Template._justResetPasswordDialog.events({
  'click #just-verified-dismiss-button': () =>
    loginButtonsSession.set('justResetPassword', false),
});

Template._justResetPasswordDialog.helpers({
  visible: () => loginButtonsSession.get('justResetPassword'),
  displayName,
});

Template._justResetPasswordDialogOverride.replaces('_justResetPasswordDialog');

//
// loginButtonsMessagesDialog template
//

Template._loginButtonsMessagesDialog.events({
  'click #messages-dialog-dismiss-button': () =>
    loginButtonsSession.resetMessages(),
});

Template._loginButtonsMessagesDialog.helpers({
  visible: () => {
    const hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');
    return !dropdown() && hasMessage;
  }
});

Template._loginButtonsMessagesDialogOverride.replaces('_loginButtonsMessagesDialog');
