import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import Welcome from "../components/Welcome";

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

describe("Welcome", () => {
  test("given Welcome component - when loaded - then it is displayed", async () => {
    //given
    render(<Welcome name="" />);

    await screen.findByRole("welcome");

    expect(screen.getByRole("welcome")).toBeDefined();
    expect(screen.getByRole("welcome").children.length).toBe(2);
    expect(screen.getByAltText("einstein smoking a cigar while browsing our website")).toBeDefined();
  });

  test("given Welcome component with name - when loaded - then the name is displayed", async () => {
    //given
    render(<Welcome name="Elke" />);

    await screen.findByRole("welcome");

    expect(screen.getByText(/Elke/)).toBeDefined();
  });
});
