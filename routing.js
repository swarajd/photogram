Router.route('/', function () {
  var user = Meteor.user();
  if (user) {
    Router.go('/feed');
  } else {
    Router.go('/sign-in');
  }
});

Router.route('/feed', function() {
  this.render('Feed');
});