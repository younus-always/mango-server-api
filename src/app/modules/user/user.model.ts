import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
      name: {
            type: String,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [255, "Name cannot exceed 255 characters"],
            trim: true,
            required: true
      },
      email: {
            type: String,
            required: true,
            validate: {
                  validator: function (value) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                  },
                  message: (props) => `${props.value} is not a valid email`,
            },
            unique: true
      },
      phone: {
            type: String,
            unique: true,
            required: [true, "Your Phone Number is not valid"]
      },
      password: {
            type: String,
            required: true
      },
      role: {
            type: String,
            enum: {
                  values: ["ADMIN", "CUSTOMER"],
                  message: "{VALUE} is not acceptable"
            },
            default: "CUSTOMER"
      }
}, {
      versionKey: false,
      timestamps: true
});

export const User = model<IUser>("User", userSchema);