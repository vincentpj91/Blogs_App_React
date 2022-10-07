/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Posts from "../index";
import "@testing-library/jest-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Posts", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

    it("Show Loader at initial stage", async () => {
      render(<Posts />);
      const loadingContainer = await screen.findByTestId("loading");
      expect(loadingContainer).toBeInTheDocument();
    });

  it("Show all posts", async () => {
    // Mocking to get 2 post as api call
    const mockPostData = {
      data: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        },
      ],
    };

    // Mocking API call for getting posts
    axios.get.mockImplementation(jest.fn(() => mockPostData));
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Posts />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
    // Checking that the dom has 2 posts
    await waitFor(() => {
      expect(screen.getAllByTestId("post-col")).toHaveLength(2);
    });
  });
});
