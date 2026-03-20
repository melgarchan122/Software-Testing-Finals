import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Moderator", "Admin"],
      default: "User",
    },
  },
  { timestamps: true },
);

//Middleware
userSchema.pre("save", async function (next) {
  //Short Circuting
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10); //Salt Value (Randomize)
});

export default mongoose.model("User", userSchema);
