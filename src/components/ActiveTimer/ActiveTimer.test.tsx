import React from "react";
import { render } from "@testing-library/react";
import ActiveTimer from "./ActiveTimer";
import moment from "moment";

test("renders", () => {
  const { getByText } = render(<ActiveTimer timer={moment()} />);
  const linkElement = getByText(/:/);
  expect(linkElement).toBeInTheDocument();
});
