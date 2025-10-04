
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    BLOCKED = 'BLOCKED',
    RESTRICTED = 'RESTRICTED'
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
  picture?: string;
  status?: UserStatus;
  isVerified?: boolean;  
}