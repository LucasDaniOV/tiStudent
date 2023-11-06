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
  id: number;
  username: string;
  bio?: string;
  createdAt: Date;
  latestActivity: Date;
  user: User;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
