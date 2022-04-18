const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  name : {
      type : String,
      required : true
  },
  avatarURL : {
      type : String,
      required : true
  },
  description : {
      type : String,
      required : true,
  },
  direction : {
      type : String,
      required : true
  },
  members : [{
      type : Schema.Types.ObjectId,
      ref : 'User'
  }],
  admin : {
      type : Schema.Types.ObjectId,
      ref : 'User'
  },
  projects : [{
      type : Schema.Types.ObjectId,
      ref : 'Project'
  }],
  activity : [{
      type : Schema.Types.ObjectId,
      ref : 'Blog'
  }]

})

const GroupModel = model('Group', GroupSchema);
module.exports = GroupModel;


