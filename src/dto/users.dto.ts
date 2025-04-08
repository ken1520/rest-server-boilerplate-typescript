import type { UserDocument } from "#models/users.model.ts";

export interface UserDTO {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// Conversion function
export const toUserDTO = (user: UserDocument): UserDTO => ({
  id: user._id.toString(),
  name: user.name,
  created_at: user.created_at,
  updated_at: user.updated_at,
});
