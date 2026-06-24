import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
      provider: { type: String, required: true },
      providerId: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema<IUser>({
      name: {
            type: String,
            trim: true,
            required: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [255, "Name cannot exceed 255 characters"],
      },
      email: {
            type: String,
            unique: true,
            trim: true,
            toLowerCase: true,
            required: true,
      },
      password: {
            type: String,
            min: [8, "Password must be contain at least 8 characters"],
            max: [20, "Password must be contain lower than 20 characters"],
            required: true
      },
      phone: {
            type: String,
            unique: true,
            sparse: true,
      },
      picture: {
            type: String,
      },
      role: {
            type: String,
            enum: Object.values(Role),
            default: Role.CUSTOMER
      },
      isVerified: {
            type: Boolean,
            default: false
      },
      isDeleted: {
            type: Boolean,
            default: false
      },
      isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.ACTIVE
      },
      auths: [authProviderSchema]
}, {
      versionKey: false,
      timestamps: true
});

export const User = model<IUser>("User", userSchema);