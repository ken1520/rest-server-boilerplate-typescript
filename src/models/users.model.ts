import mongoose, { Schema, Document } from "mongoose";

// Interface for the User document
export interface UserDocument extends Document {
  name: string;
  created_at: Date;
  updated_at: Date;
}

// Schema definition
const userSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

// Create the model
export const Users = mongoose.model<UserDocument>("guests", userSchema);

// export default Users;
