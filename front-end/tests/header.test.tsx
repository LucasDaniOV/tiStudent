import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Category } from "../../back-end/domain/model/category";
import { Subject } from "../../back-end/domain/model/subject";
import Header from "../components/header/Header";
import React from "react";
import { useTranslation } from "react-i18next";

const testUser = {
  id: "testUser",
  email: "testUser@test.com",
  password: "Test123!!!!",
};
const testDate = new Date();
const testProfile = {
  id: "testProfile",
  username: "testProfileUsername",
  bio: "testProfileBio",
  createdAt: testDate,
  latestActivity: testDate,
  user: testUser,
};
const testResource = {
  id: 1,
  createdAt: "2023-12-29T14:41:55.854Z",
  updatedAt: "2023-12-29T14:41:55.854Z",
  title: "example title",
  description: "example description",
  profileId: 1,
  categories: [
    {
      category: {
        id: 1,
        name: "Category Name",
      },
    },
  ],
  subjects: [
    {
      subject: {
        id: 1,
        name: "Subject Name",
      },
    },
  ],
  comments: [
    {
      id: 1,
      createdAt: "2023-12-29T14:41:55.854Z",
      updatedAt: "2023-12-29T14:41:55.854Z",
      message: "example message",
      profile: {
        id: 1,
        username: "JJ",
      },
      likes: [
        {
          createdAt: "2023-12-29T14:41:55.854Z",
          profileId: 1,
          commentId: 1,
        },
      ],
    },
  ],
  likes: [
    {
      createdAt: "2023-12-29T14:41:55.854Z",
      profileId: 1,
      resourceId: 1,
    },
  ],
};

const testComment = {
  id: "testComment",
  message: "testCommentMessage",
  createdAt: testDate,
  edited: false,
  profile: testProfile,
  resource: testResource,
  parentId: String(),
};

window.React = React;

test("given Header component - when loaded - then it is displayed", async () => {
  //given
  render(<Header current={"/home"} />);
  //when
  await screen.findByRole("heading");

  // //then
  expect(screen.getByRole("heading").children[0].textContent).toBe(
    "app.title" + "header.nav.home" + "header.nav.resources" + "header.nav.profiles" + "header.nav.login"
    // + Language component
  );
  expect(screen.getByRole("heading").children[0].children.length === 4);
});
