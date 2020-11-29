import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/app/app.js';
import '../../ui/pages/home/home.js';
import '../../ui/components/accounts-ui-overrides/accounts-ui-overrides.js';

FlowRouter.route('*', {
  name: 'home',
  action() {
    this.render('app', 'home');
  },
});
