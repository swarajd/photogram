Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Meteor.startup(function() {
    loadFilePicker('ApMd9acUFT2m06b4MDgCZz');
  });
}

if (Meteor.isServer) {
  process.env.MAIL_URL="smtp://swaraj.dhumne%40gmail.com:edfqgtrcrtsbokxk@smtp.gmail.com:587/"; 
}
