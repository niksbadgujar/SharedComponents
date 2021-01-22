// @ts-nocheck
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { optionsArray } from "./mockData";
import DropdownHeader from "./DropdownHeader/DropdownHeader";
import AvailableBalance from "./AvailableBalance";
import SingleAccount from "./SingleAccount";
import { Box, Flex } from "rebass";

const DropdownIndex = (props) => {
  const [options, setOptions] = useState([]);
  const [isSingleAccount, setIsSingleAccount] = useState(false);

  const [stateBalanceText, setBalanceText] = useState("");
  const [stateBalance, setBalance] = useState("");

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

  const getSelectedAccount = (selectedAccountObj) => {
    const { balanceText = "", balance = "" } = selectedAccountObj;
    setBalanceText(balanceText);
    setBalance(balance);
  };

  const {
    accountType = "",
    accountHolderName = "",
    accountNumber = "",
    sortCode = "",
  } = options[0] || {};

  return (
    <>
      <DropdownHeader>
        {isSingleAccount === true ? (
          <>
            <Flex
              className={`mt-1 ${isSingleAccount ? "ml-5" : ""}`}
              sx={{
                flexGrow: "3",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box className="single-box">
                <SingleAccount
                  accountType={accountType}
                  accountHolderName={accountHolderName}
                  accountNumber={accountNumber}
                  sortCode={sortCode}
                  isSingleAccount={true}
                />
              </Box>
              <Box className="available-bal-box">
                <AvailableBalance
                  balanceText={options[0].balanceText}
                  balance={options[0].balance}
                />
              </Box>
            </Flex>
          </>
        ) : (
          <>
            <Flex
              className="mt-1 ml-5"
              sx={{
                flexGrow: "3",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Box className="single-box" sx={{ width: "20%" }}>
                <Dropdown
                  options={options}
                  defaultAccount={options[0]}
                  selectedAccount={getSelectedAccount}
                />
              </Box>
              <Box className="available-bal-box">
                <AvailableBalance
                  balanceText={stateBalanceText}
                  balance={stateBalance}
                />
              </Box>
            </Flex>
          </>
        )}
      </DropdownHeader>
    </>
  );
};

export default DropdownIndex;
