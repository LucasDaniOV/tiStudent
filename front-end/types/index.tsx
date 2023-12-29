export type Role = "ADMIN" | "USER";

export type Resource = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  profileId: string;
};

export type Profile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  latestActivity: Date;
  email: string;
  username: string;
  password: string;
  role: Role;
  bio?: string;
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  profileId: string;
  resourceId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Type =
  | "users"
  | "resources"
  | "profiles"
  | "likes"
  | "categories"
  | "subjects"
  | "comments";
