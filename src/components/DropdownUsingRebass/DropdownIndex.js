// @ts-nocheck
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { optionsArray } from "./mockData";
import DropdownHeader from "./DropdownHeader/DropdownHeader";

const DropdownIndex = (props) => {
  const [options, setOptions] = useState([]);
  const [isSingleAccount, setIsSingleAccount] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const accounts = optionsArray;
    const modifiedAccountsArray = accounts.map((obj) => ({
      sortCode: obj.sortCode,
      accountHolderName: obj.accountHolderName,
      accountNumber: obj.accountNumber,
      accountType: obj.accountType,
      fullName: obj.fullName,
      accountHolderType: obj.accountHolderType,
      balance: obj.balance,
      balanceText: obj.balanceText,
    }));
    if (modifiedAccountsArray.length === 1) {
      setIsSingleAccount(true);
    } else {
      setIsSingleAccount(false);
    }
    setOptions(modifiedAccountsArray);
  };
  return (
    <>
      <DropdownHeader>
        <Dropdown
          options={options}
          isSingleAccount={isSingleAccount}
          defaultAccount={options[0]}
        />
      </DropdownHeader>
    </>
  );
};

export default DropdownIndex;
