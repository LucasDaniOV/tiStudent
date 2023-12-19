import { Category } from "../../back-end/domain/model/category";
import { Subject } from "../../back-end/domain/model/subject";

export type Resource = {
  id: string;
  creator: Profile;
  createdAt: Date;
  title: string;
  description: string;
  category: Category;
  subject: Subject;
};

type Role = "admin" | "user" | "guest";

export type Profile = {
  id: string;
  email: string;
  password: string;
  role: Role;
  username: string;
  bio?: string;
  createdAt: Date;
  latestActivity: Date;
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
  comment?: Comment;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Type = "users" | "resources" | "profiles" | "likes";
