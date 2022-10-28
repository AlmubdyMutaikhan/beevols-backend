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
  events:[{
    type:Schema.Types.ObjectId,
    ref:'Is'
  }],
  projects : [{
      type : Schema.Types.ObjectId,
      ref : 'Project'
  }],
  activity : [{
      type : Schema.Types.ObjectId,
      ref : 'Blog'
  }],
  adress : {
      type : String
  },
  createdAt : {
      type : Date,
      default : Date.now
  },
  contacts : {
      email : {
          type : String
      },
      phone: {
          type : String
      }
  },
  projects : [{
      name : {
          type : String
      },
      deadline : {
          type : String
      },
      desc : {
          type : String
      },
      todos : [{
          name : {
              type : String
          },
          assignedTo: [{
            type : String             
          }],
          lvl : {
              type : String
          }
      }],
      finished : {
          type : Boolean,
          default : false
      },
      direction : {
          type : String
      },
      avatarURL : {
          type : String
      }
  }]
})

const GroupModel = model('Group', GroupSchema);
module.exports = GroupModel;


