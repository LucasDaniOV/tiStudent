import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import Language from "../components/header/Language";

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

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

describe("Language component", () => {
  test("given Language component - when loaded - then renders correctly", async () => {
    //given
    render(<Language />);

    //when
    await screen.findByRole("language");
    const languageDropdown = screen.getByRole("language");

    //then
    expect(languageDropdown).toBeDefined();
  });
  test("given Language component - when loaded - then has 4 available languages", async () => {
    //given
    render(<Language />);

    //when
    await screen.findByRole("language");
    const languageDropdown = screen.getByRole("language");
    const availableLanguages = Array.from(languageDropdown.children).map((x) => x.textContent);

    //then
    expect(languageDropdown).toBeDefined();
    expect(availableLanguages).toEqual(["English", "Nederlands", "Español", "Română"]);
  });
});
