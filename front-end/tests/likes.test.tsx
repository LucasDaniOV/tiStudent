import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Likes from "../components/likes/likes";
import LikeService from "../services/LikeService";
import { Like } from "../types";

window.React = React;

const now = new Date();

const resourceLikes: Like[] = [
  {
    resourceId: "1",
    profileId: "2",
    createdAt: now,
  },
];

const resourceLikesAfterClick: Like[] = [
  {
    resourceId: "1",
    profileId: "2",
    createdAt: now,
  },
  {
    resourceId: "1",
    profileId: "3",
    createdAt: now,
  },
];

const commentLikes: Like[] = [
  {
    profileId: "2",
    createdAt: now,
    resourceId: "1",
    commentId: "1",
  },
];
const commentLikesAfterClick: Like[] = [
  {
    profileId: "2",
    createdAt: now,
    resourceId: "1",
    commentId: "1",
  },
  {
    profileId: "#",
    createdAt: now,
    resourceId: "1",
    commentId: "1",
  },
];

let likeService: jest.Mock;
likeService = jest.fn();

describe("Likes component", () => {
  test("given Likes component - when loaded - then render correctly", async () => {
    //given
    render(<Likes likesObjects={resourceLikes} object="resource" profileId="3" resourceId="1" />);

    //when
    await screen.findByRole("likes");
    const likeButton = screen.getByRole("likes").children[0];
    const likes = likeButton.children[0];

    //then
    expect(screen.getByRole("likes"));
    expect(likes.textContent).toEqual("1");
  });

  test("given Likes component - when you like a resource - then the resource's likes count is increased", async () => {
    //given
    LikeService.likeResource = likeService.mockResolvedValue(resourceLikesAfterClick);
    render(<Likes likesObjects={resourceLikes} object="resource" profileId="3" resourceId="1" />);

    //when
    await screen.findByRole("likes");
    const likeButton = screen.getByRole("likes").children[0];
    const likes = likeButton.children[0].textContent;

    fireEvent.click(likeButton);
    const likesAfterCLick = likeButton.children[0].textContent;

    //then
    expect(screen.getByRole("likes"));
    expect(likes).not.toEqual(likesAfterCLick);
    expect(likes).toBe("1");
    expect(likesAfterCLick).toBe("2");
  });

  test("given Likes component - when you like a comment - then the comment's likes count is increased", async () => {
    //given
    LikeService.likeComment = likeService.mockResolvedValue(commentLikesAfterClick);
    render(<Likes likesObjects={commentLikes} object="comment" profileId="3" resourceId="1" commentId="1" />);

    //when
    await screen.findByRole("likes");
    const likeButton = screen.getByRole("likes").children[0];
    const likes = likeButton.children[0].textContent;
    fireEvent.click(likeButton);
    const likesAfterCLick = likeButton.children[0].textContent;

    //then
    expect(screen.getByRole("likes"));
    expect(likes).not.toEqual(likesAfterCLick);
    expect(likes).toBe("1");
    expect(likesAfterCLick).toBe("2");
  });
  test("given Likes component - when you like a resource and refresh - then your like isn't removed", async () => {
    //given
    LikeService.likeResource = likeService.mockResolvedValue(resourceLikesAfterClick);

    //when
    const { rerender } = render(<Likes likesObjects={resourceLikes} object="resource" profileId="3" resourceId="1" />);

    await screen.findByRole("likes");
    const likeButton = screen.getByRole("likes").children[0];
    fireEvent.click(likeButton);

    rerender(<Likes likesObjects={resourceLikesAfterClick} object="resource" profileId="3" resourceId="1" />);
    const likesAfterRefresh = likeButton.children[0].textContent;

    //then
    expect(screen.getByRole("likes"));
    expect(likesAfterRefresh).toBe("2");
    expect(screen.getByText("2"));
  });
});
