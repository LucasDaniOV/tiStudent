import Header from "../components/header";
import React from "react";
import { render } from "@testing-library/react";
import userEvent, { screen } from "@testing-library/dom";
import UserInfo from "../components/users/UserInfo";
import ProfileInfo from "../components/profiles/ProfileInfo";
import { Category } from "../../back-end/domain/model/category";
import { Subject } from "../../back-end/domain/model/subject";
import ResourceInfo from "../components/resources/ResourceInfo";
import CommentInfo from "../components/comments/CommentInfo";

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
const testCategory = Category.Summary;
const testSubject = Subject.AI_Applications;
const testResource = {
  id: "testResource",
  creator: testProfile,
  createdAt: testDate,
  title: "testResourceTitle",
  description: "testResourceDescription",
  category: testCategory,
  subject: testSubject,
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
test("given Header component - when loaded - then it is displayed", async () => {
  //given
  render(<Header />);
  //when
  await screen.findByRole("heading");
  const title = screen.getByRole("heading").children[0].textContent;
  const nav = screen.getByRole("heading").children[1];

  //then
  expect(title === "tiStudent App");
  expect(
    nav.textContent === "Home" + "Users" + "Resources" + "Profiles" + "Login"
  );
  expect(nav.children.length === 5);
});

test("given UserInfo component - when loaded - then it is displayed", async () => {
  //given
  render(<UserInfo user={testUser} />);
  //when
  await screen.findByRole("userInfo");
  const userInfo = screen.getByRole("userInfo");
  //then
  expect(userInfo.children.length === 3);
  expect(screen.getByText("testUser"));
  expect(screen.getByText("testUser@test.com"));
  expect(screen.getByText("Test123!!!!"));
});

test("given ProfileInfo component - when loaded - then it is displayed", async () => {
  //given
  render(<ProfileInfo profile={testProfile} />);
  //when
  await screen.findByRole("profileInfo");
  const profileInfo = screen.getByRole("profileInfo");
  //then
  expect(profileInfo.children.length === 6);
  expect(screen.getByText("testProfile")); //id
  expect(screen.getByText("testProfileUsername")); //username
  expect(screen.getByText("testProfileBio")); //bio
  expect(screen.getAllByText(String(testDate)).length === 2); //createdAt, latestActivity
});

test("given ResourceInfo component - when loaded - then it is displayed", async () => {
  //given
  render(<ResourceInfo resource={testResource} />);
  //when
  await screen.findByRole("resourceInfo");
  const profileInfo = screen.getByRole("resourceInfo");
  //then
  expect(profileInfo.children.length === 3);
  expect(profileInfo.children[2].children.length === 4);
  expect(screen.getByText("testResourceTitle")); //Title
  expect(screen.getByText("testResourceDescription")); //Description
  expect(screen.getByText("Summary")); // Category
  expect(screen.getByText(String(testDate))); //createdAt
  expect(screen.getByText("AI Applications")); // Subject
  expect(screen.getByText("testProfile")); //creator ID
});

test("given CommentInfo component - when loaded - then it is displayed", async () => {
  //given
  render(<CommentInfo comment={testComment} />);
  //when
  await screen.findByRole("resourceInfo");
  const profileInfo = screen.getByRole("resourceInfo");
  //then
  expect(profileInfo.children.length === 3);
  expect(profileInfo.children[2].children.length === 4);
  expect(screen.getByText("testResourceTitle")); //Title
  expect(screen.getByText("testResourceDescription")); //Description
  expect(screen.getByText("Summary")); // Category
  expect(screen.getByText(String(testDate))); //createdAt
  expect(screen.getByText("AI Applications")); // Subject
  expect(screen.getByText("testProfile")); //creator ID
});
