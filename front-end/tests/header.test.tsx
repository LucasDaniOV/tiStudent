import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../components/header/Header";

window.React = React;

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    locale: "en",
    pathname: "",
    asPath: "",
    query: {},
    push: jest.fn(),
  })),
}));

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

describe("Header component", () => {
  test("given Header component - when loaded - then renders correctly", async () => {
    //given
    render(<Header current="home" isLoggedIn={true} />);

    //when
    await screen.findByRole("header");
    const header = screen.getByRole("header");

    //then
    expect(header).toBeDefined();
    expect(header.children).toHaveLength(3);
  });
});
