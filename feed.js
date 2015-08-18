if (Meteor.isClient) {
  Template.Feed.helpers({
    images: function() {
      return Images.find({}, {sort: {createdAt: -1}});
    },
    username: function() {
      if (Meteor.userId()) {
        return Meteor.user().username;
      } else {
        return null;
      }
    }
  });

  Template.Feed.events({
    "click .log-out": function(event) {
      AccountsTemplates.logout();
      Router.go('/sign-in');
    },
    "click .upload": function(event) {
      console.log("upload a picture!");
      filepicker.pick(
        {
          cropRatio: 1/1,
          mimetype: 'image/*',
          services: ['CONVERT', 'COMPUTER']
        },
        function(Blob){
          var user = Meteor.user();
          var url = Blob.url;
          console.log(user);
          console.log(url);
          Meteor.call("uploadImage", url);
        }
      );
    }
  });
}

Meteor.methods({
  uploadImage: function(url) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Images.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      imageURL: url,
      createdAt: new Date(),
      softDate: moment().format('ll'),
      likes: 0,
      likedBy: [],
      comments: []
    });
  }
});