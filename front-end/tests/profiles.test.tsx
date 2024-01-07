// import { render, screen } from "@testing-library/react";
// import React from "react";
// import ProfilesOverviewTable from "../components/profiles/ProfilesOverviewTable";
// import { Profile } from "../types";

// window.React = React;

// jest.mock("next/router", () => ({
//   __esModule: true,
//   useRouter: jest.fn(() => ({
//     locale: "en",
//     pathname: "",
//     asPath: "",
//     query: {},
//     push: jest.fn(),
//   })),
// }));

// const now = new Date();

// const profiles: Profile[] = [
//   {
//     id: "1",
//     createdAt: now,
//     updatedAt: now,
//     latestActivity: now,
//     email: "satoshi@tistudent.com",
//     username: "JJ",
//     password: "$2b$12$hK4WraUc7YClBpGUQii4qu4zqjm3hgoi6VPwYLcbcLvHJjJepeD1u",
//     role: "ADMIN",
//     bio: "",
//     picture: "default-profilePicture.jpg",
//   },
//   {
//     id: "2",
//     createdAt: now,
//     updatedAt: now,
//     latestActivity: now,
//     email: "alice@gmail.com",
//     username: "ICE money bang bang",
//     password: "$2b$12$hVXnOfap1aQapfdrjGnLCevnbjyxRuiGLsWQNq2S.2eolBUViBrR.",
//     role: "USER",
//     bio: "",
//     picture: "default-profilePicture.jpg",
//   },
//   {
//     id: "3",
//     createdAt: now,
//     updatedAt: now,
//     latestActivity: now,
//     email: "bob@gmail.com",
//     username: "BobTheBuilder",
//     password: "$2b$12$7ZW154aV9KzH3Oxai6G/UOrR.HBdsl5RB9GHcB9w6ATBnMWAE6ReO",
//     role: "USER",
//     bio: "Call me bob the way I make these samenvattingen like damn.",
//     picture: "default-profilePicture.jpg",
//   },
// ];

// jest.mock("swr", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({ data: {}, isLoading: false, error: null })),
//   mutate: jest.fn(),
// }));

// jest.mock("next-i18next", () => ({
//   useTranslation: () => ({ t: jest.fn() }),
// }));

// jest.mock("use-interval", () => jest.fn());

// describe("ProfilesOverviewTable component", () => {
//   test("given ProfilesOverviewTable component - when loaded - then renders correctly", async () => {
//     //given
//     render(<ProfilesOverviewTable profiles={profiles} />);

//     //when
//     await screen.findByRole("profiles");
//     const profilesTable = screen.getByRole("profiles");
//     const table = profilesTable.children[1];

//     //then
//     expect(profilesTable).toBeDefined();
//     expect(profilesTable.children).toHaveLength(2);
//     expect(table.children).toHaveLength(3);
//     expect(screen.getByText("JJ"));
//     expect(screen.getByText("ICE money bang bang"));
//     expect(screen.getByText("BobTheBuilder"));
//   });
// });
