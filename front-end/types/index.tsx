import { Category } from "../../back-end/domain/model/category";
import { Subject } from "../../back-end/domain/model/subject";

export type User = {
  id: string;
  _email: string;
  _password: string;
};

export type Resource = {
  id: string;
  creator: User;
  createdAt: Date;
  _title: string;
  _description: string;
  _category: Category;
  _subject: Subject;
};
