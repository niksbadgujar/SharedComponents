import { render, cleanup } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Test suite for Dropdown component", () => {
  const options = [
    {
      accountType: "Business A/C",
      accountHolderName: "Abc",
      accountNumber: "82622823",
      sortCode: "400520",
      balance: "-1898.55",
      balanceText: "GBL",
    },
    {
      accountType: "Business A/C",
      accountHolderName: "Abc",
      accountNumber: "82622897",
      sortCode: "800523",
      balance: "188.55",
      balanceText: "GBL",
    },
  ];
  const { container, getByTestId, getByRole } = render(
    <Dropdown
      options={options}
      defaultAccount={options[0]}
      isSingleAccount={false}
      accountType="Business A/C"
      accountHolderName="ABC"
      accountNumber="82622823"
      sortCode="400520"
      selectedAccount={jest.fn()}
    />
  );

  test("Snapshot test to check component renders properly ", () => {
    expect(container).toMatchSnapshot();
  });

  test("Select Dropdown", () => {
    console.log("", container);
  });
  // test("Test", () => {
  //   console.log("child - ", container.getElementsByClassName("select"));
  // });

  // test("Test to check component renders", () => {
  //   const { container, getByTestId, getByRole } = render(
  //     <Dropdown
  //       options={options}
  //       defaultAccount={options[0]}
  //       isSingleAccount={false}
  //       accountType="Business A/C"
  //       accountHolderName="ABC"
  //       accountNumber="82622823"
  //       sortCode="400520"
  //       selectedAccount={jest.fn()}
  //     />
  //   );
  //   expect(container.querySelector("#sort-code").textContent).toBe(
  //     "40-05-20  82622823"
  //   );
  // });
});
