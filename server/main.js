import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import onStartApp from '../imports/api/onStartApp';


Meteor.startup(() => {
  onStartApp();
});

