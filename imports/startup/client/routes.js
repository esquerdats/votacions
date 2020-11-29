import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/app/app.js';
import '../../ui/pages/home/home.js';

FlowRouter.route('*', {
  name: 'home',
  action() {
    this.render('app', 'home');
  },
});
