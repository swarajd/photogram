if (Meteor.isClient) {

}

if (Meteor.isServer) {
  process.env.MAIL_URL="smtp://swaraj.dhumne%40gmail.com:edfqgtrcrtsbokxk@smtp.gmail.com:587/"; 
}

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

AccountsTemplates.configureRoute('signIn', {
    template: 'Home',
    redirect: function(){
        var user = Meteor.user();
        if (user) {
          Router.go('/feed');
        } else {
          Router.go('/sign-in');
        }
    }
});

AccountsTemplates.configure({
  sendVerificationEmail: true,
  enforceEmailVerification: true,
  showForgotPasswordLink: true
});

AccountsTemplates.configureRoute('verifyEmail', {
  template: 'ValidationForm'
});

AccountsTemplates.configureRoute('forgotPwd', {
  template: 'ValidationForm'
});

AccountsTemplates.configureRoute('resetPwd', {
  template: 'ValidationForm'
});
