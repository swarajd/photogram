if (Meteor.isClient) {

  Template.Image.helpers({
    likedByYou: function(imageID) {
      var liked = Images.find({
        _id: imageID,
        likedBy: { $in: [Meteor.userId()] }
      }).count( );
      return (liked != 0);
    }
  });

  Template.Image.events({
    "keypress input.post-add-comment": function(event) {
      if (event.which === 13) {
        var imageID = event.currentTarget.getAttribute('id');
        var comment = event.currentTarget.value;
        var username = Meteor.user().username;
        var fullComment = {
          comment: comment,
          username: username
        };
        Meteor.call("addComment", imageID, fullComment);
        event.currentTarget.value = "";
      }
    },
    "click .unliked": function(event) {
      var userID = Meteor.userId();
      var imageID = event.currentTarget.getAttribute('id');
      Meteor.call("likePhoto", imageID, userID);
    },
    "click .liked": function(event) {
      var userID = Meteor.userId();
      var imageID = event.currentTarget.getAttribute('id');
      Meteor.call("unlikePhoto", imageID, userID);
    }
  });
}

Meteor.methods({
  addComment: function(imageID, comment) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Images.update(
      {
        _id: imageID
      },
      {
        $push: { comments: {
          username: comment.username,
          content: comment.comment
        }}
      }
    );
  },
  likePhoto: function(imageID, userID) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var liked = Images.find({
      _id: imageID,
      likedBy: { $in: [userID] }
    }).count();

    if (liked != 0) {
      throw new Meteor.Error("already liked");
    }

    Images.update(
      {
        _id: imageID
      },
      {
        $inc: { likes: 1 },
        $push: { likedBy: userID }
      }
    );
  },
  unlikePhoto: function(imageID, userID) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var liked = Images.find({
      _id: imageID,
      likedBy: { $in: [userID] }
    }).count( );

    if (liked == 0) {
      throw new Meteor.Error("already unliked");
    }

    Images.update(
      {
        _id: imageID
      },
      {
        $inc: { likes: -1 },
        $pull: { likedBy: userID }
      }
    );
  }
});