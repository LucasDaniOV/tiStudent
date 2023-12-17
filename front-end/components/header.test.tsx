import Header from "./header";
import React from "react";
import { render } from "@testing-library/react";
import userEvent, { screen } from "@testing-library/dom";

test("Loads and displays Header", async () => {
  //ARRANGE
  render(<Header />);
  //ACT
  await screen.findByRole("header"); //heading moogt ge ni gebruike want is denkik implicit (builtin) vr elk element in de header

  //ASSERT
  expect(screen.getByRole("header").children.length === 2);
});
