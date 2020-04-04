import React from "react";
import { render } from "@testing-library/react";
import Timer from "./Timer";

test("renders timer", () => {
  const { getByText } = render(<Timer />);
  const linkElement = getByText(/timer/i);
  expect(linkElement).toBeInTheDocument();
});
