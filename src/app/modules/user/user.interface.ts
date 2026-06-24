
export enum Role {
      SUPER_ADMIN = "SUPER_ADMIN",
      ADMIN = "ADMIN",
      CUSTOMER = "CUSTOMER",
};

export interface IAuthProvider {
      provider: "google" | "credentials";
      providerId: string;
};

export enum IsActive {
      ACTIVE = "ACTIVE",
      INACTIVE = "INACTIVE",
      BLOCKED = "BLOCKED",
};

export interface IUser {
      name: string;
      email: string;
      password: string;
      phone?: string;
      picture?: string;
      role?: Role;
      isVerified?: boolean;
      isDeleted?: boolean;
      isActive?: IsActive;
      auths?: [IAuthProvider];
};
