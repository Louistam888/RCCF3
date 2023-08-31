import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: {
        type: String,
        required: true,
      },
    },
    isAdmin: {
      type: {
        type: Boolean,
        type: String,
        default: false,
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPasswword) {
  return await bcrypt.compare(enteredPassword, this.password); //this refers to password
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } // if password is modified, generate new salt

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
