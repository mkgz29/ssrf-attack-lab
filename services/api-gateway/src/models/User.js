const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, 
      unique: true,   
      trim: true,     
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'], 
      default: 'user',
    },


    personalData: {
      fullName: String,
      phone: String,
      address: String,
    },


    isBackdoor: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: String,
      default: 'system',
    },
  },
  {
    timestamps: true, 
  }
);


UserSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();


  this.password = await bcrypt.hash(this.password, 10);

  next(); 
});

UserSchema.methods.comparePassword = async function (candidatePassword) {

  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);