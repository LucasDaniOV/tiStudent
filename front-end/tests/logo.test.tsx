import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import Logo from "../components/header/Logo";

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

describe("Logo component", () => {
  test("given Logo component - when loaded - then renders correctly", async () => {
    //given
    render(<Logo />);

    //when
    await screen.findByRole("logo");
    const logo = screen.getByRole("logo");
    const logoImage = screen.getByAltText("tiStudent Logo");

    //then
    expect(logo).toBeDefined();
    expect(logo.children).toHaveLength(2);
    expect(logo.children[0].textContent).toEqual("tiStudent");
    expect(logoImage).toBeInstanceOf(Image);
  });
});
