const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, 'A Username is Required!'],
      minlength: [2, '2 Character Minimum!'],
      maxlength: [15, '15 Character Max'],
    },
    firstName: {
      type: String,
      required: [true, 'A First Name is Required!'],
      minlength: [2, '2 Character Minimum!'],
      maxlength: [255, '255 Max'],
    },
    lastName: {
      type: String,
      required: [true, 'A Last Name is Required!'],
      minlength: [2, '2 Character Minimum!'],
      maxlength: [255, '255 Max'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'A E-mail is Required!'],
      validate: {
        validator: (value) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value),
        message: 'Please Enter A Valid Email',
      },
    },
    password: {
      type: String,
      required: [true, 'A Password is Required!'],
      minlength: [8, 'Password Must Be 8 Characters Or More'],
    },
  },
  { timestamps: true }
);

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords Do Not Match!');
  }
  next();
});

UserSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (e) {
    console.log('ERROR IN HASHING: ', e);
  }
});

const User = new mongoose.model('User', UserSchema);
module.exports = User;
