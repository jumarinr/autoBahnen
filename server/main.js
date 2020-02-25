import { Meteor } from 'meteor/meteor';
import onStartApp from '../startup/onStartApp';
import '../imports/api/index';

Meteor.startup(() => {
  onStartApp();
});

