import { Category } from "../../back-end/domain/model/category";
import { Subject } from "../../back-end/domain/model/subject";

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Resource = {
  id: string;
  creator: Profile;
  createdAt: Date;
  title: string;
  description: string;
  category: Category;
  subject: Subject;
};

export type Profile = {
  id: string;
  username: string;
  bio?: string;
  createdAt: Date;
  latestActivity: Date;
  user: User;
};

export type Comment = {
  id: string;
  message: string;
  createdAt: Date;
  edited: boolean;
  profile: Profile;
  resource: Resource;
  parentId: string;
};

export type Like = {
  id: string;
  createdAt: Date;
  profile: Profile;
  resource: Resource;
  parentId: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Type = "users" | "resources" | "profiles" | "likes";
