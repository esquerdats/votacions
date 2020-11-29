// for convenience
const loginButtonsSession = Accounts._loginButtonsSession;

//
// helpers
//

export const displayName = () => {
  const user = Meteor.user();
  if (!user)
    return '';

  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;

  return '';
};

// returns an array of the login services used by this app. each
// element of the array is an object (eg {name: 'facebook'}), since
// that makes it useful in combination with handlebars {{#each}}.
//
// don't cache the output of this function: if called during startup (before
// oauth packages load) it might not include them all.
//
// NOTE: It is very important to have this return password last
// because of the way we render the different providers in
// login_buttons_dropdown.html
export const getLoginServices = () => {
  // First look for OAuth services.
  const services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];

  // Be equally kind to all login services. This also preserves
  // backwards-compatibility. (But maybe order should be
  // configurable?)
  services.sort();

  // Add password, if it's there; it must come last.
  if (hasPasswordService())
    services.push('password');

  return services.map(name => ({ name }));
};

export const hasPasswordService = () => !!Package['accounts-password'];

export const dropdown = () => 
hasPasswordService() || getLoginServices().length > 1;

// XXX improve these. should this be in accounts-password instead?
//
// XXX these will become configurable, and will be validated on
// the server as well.
export const validateUsername = username => {
  if (username.length >= 3) {
    return true;
  } else {
    loginButtonsSession.errorMessage("El nom d'usuari ha de tenir almenys 3 caracters.");
    return false;
  }
};

export const validateEmail = email => {
  if (passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')
    return true;

  if (email.includes('@')) {
    return true;
  } else {
    loginButtonsSession.errorMessage("El correu electrònic no és vàlid.");
    return false;
  }
};

export const validatePassword = password => {
  if (password.length >= 6) {
    return true;
  } else {
    loginButtonsSession.errorMessage("La contrasenya ha de tenir almenys 6 caracters.");
    return false;
  }
}
