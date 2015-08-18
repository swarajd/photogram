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
  showForgotPasswordLink: true,
  lowercaseUsername: true,
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

AccountsTemplates.configureRoute('verifyEmail', {
  template: 'ValidationForm'
});

AccountsTemplates.configureRoute('forgotPwd', {
  template: 'ValidationForm'
});

AccountsTemplates.configureRoute('resetPwd', {
  template: 'ValidationForm'
});