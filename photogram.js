if (Meteor.isClient) {

}

if (Meteor.isServer) {
  
}

Router.route('/', function () {
  var user = Meteor.user();
  if (user) {
    Router.go('/feed');
  } else {
    this.render('Home');
  }
});

Router.route('/feed', function() {
  this.render('Feed');
});

AccountsTemplates.configureRoute('signIn', {
    template: 'Home',
    redirect: function(){
        var user = Meteor.user();
        if (user) {
          Router.go('/feed');
        } else {
          Router.go('/');
        }
    }
});