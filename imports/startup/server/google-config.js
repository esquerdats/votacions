import { ServiceConfiguration } from "meteor/service-configuration";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert(
    {
      service: "google",
    },
    {
      $set: {
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret,
        loginStyle: "popup",
      },
    }
  );
});
