import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import Nav from "../components/header/Nav";

window.React = React;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (str: string) => str }),
}));

describe("Navigation", () => {
  test("given Nav component - when loaded - then it is displayed", async () => {
    //given
    render(<Nav current="home" />);
    //when
    await screen.findByRole("navigation");

    //then
    expect(screen.getByRole("navigation").textContent).toBe(
      "header.nav.home" + "header.nav.resources" + "header.nav.profiles" + "header.nav.login"
    );
    expect(screen.getByRole("navigation").children).toHaveLength(4);
  });

  test("given Nav component - when logged in - then last item is 'Logout' ", async () => {
    //given
    render(<Nav current="home" isLoggedIn={true} />);
    //when
    await screen.findByRole("navigation");
    //then
    expect(screen.getByRole("navigation").textContent).toEqual(
      "header.nav.home" + "header.nav.resources" + "header.nav.profiles" + "header.nav.logout"
    );
    expect(screen.getByRole("navigation").children).toHaveLength(4);
  });

  test("given Nav component - when on a specific page - then this page's text has different style ", async () => {
    //given
    render(<Nav current="home" isLoggedIn={true} i18nIsDynamicList />);
    //when
    await screen.findByRole("navigation");
    const homeLink = screen.getByRole("navigation").children[0].classList;
    const otherLink = screen.getByRole("navigation").children[1].classList;

    // //then
    expect(homeLink).toHaveLength(2);
    expect(otherLink).toHaveLength(3);

    expect(homeLink[0]).toBe("text-xl");
    expect(homeLink[1]).toBe("text-blue-500");

    expect(otherLink[0]).toEqual(homeLink[0]); // Text has same size
    expect(otherLink[1]).toBe("text-white");
    expect(otherLink[2]).toEqual("hover:" + homeLink[1]); // Hover color equals color of selected page
  });
});
