import { render, cleanup } from "@testing-library/react";
import SingleAccount from "../SingleAccount";

describe("Test suite for SingleAccount component", () => {
  const options = [
    {
      accountType: "Business A/C",
      accountHolderName: "Abc",
      accountNumber: "82622823",
      sortCode: "400520",
      balance: "-1898.55",
      balanceText: "GBL",
    },
  ];

  afterEach(cleanup);

  test("Test to check sort code label rendered as expected", () => {
    const { container } = render(<SingleAccount options={options} />);
    expect(container.querySelector("#header-text").textContent).toBe(
      "40-05-20  82622823"
    );
  });

  test("Test to check amount value renders as expected", () => {
    const { container } = render(
      <SingleAccount options={options} balance={options[0].balance} />
    );
    expect(container.querySelector("#amount-text").textContent).toBe(
      "1,898.55"
    );
  });
});
