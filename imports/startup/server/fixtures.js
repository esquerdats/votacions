import { Meteor } from 'meteor/meteor';
import { Polls } from '../../api/polls/polls.js';

Meteor.startup(() => {
  if (Polls.find().count() === 0) {
    const data = [
      {
        question: 'Acceptes la mesa?',
        open: true,
        options: ['Sí', 'No']
      },
      {
        question: 'Què et semblen els menhirs?',
        open: false,
        options: ['Bé', 'Molt bé', 'Genial']
      },
    ];
    data.forEach(poll => Polls.insert(poll));
  }
});
