import { render, cleanup } from "@testing-library/react";
import SingleAccount from "../SingleAccount";

describe("Test suite for SingleAccount component", () => {
  const props = {
    accountType: "Business A/C",
    accountHolderName: "Abc",
    accountNumber: "82622823",
    sortCode: "400520",
  };

  const { container } = render(<SingleAccount {...props} />);

  test("Test to check sort code label rendered as expected", () => {
    expect(container.querySelector("#header-text").textContent).toBe(
      "40-05-20  82622823"
    );
  });
});
