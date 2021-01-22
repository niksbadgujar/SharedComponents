// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { Box, Flex } from "rebass";
import SingleAccount from "./SingleAccount";
import {
  StyledArrowImg,
  StyledCol, // keep
  StyledImage,
  customStyles,
} from "./dropdownRebassStyles";
import { formatSortCode } from "./Utils/commonMethods";

const CustomOptions = ({ children, ...props }) => {
  const {
    data: {
      sortCode,
      accountHolderName,
      fullName,
      accountNumber,
      accountType,
      accountHolderType,
      balance,
      balanceText,
    } = {},
    isSelected,
    selectProps: {
      value: { accountNumber: defaultAccountNumber = "" } = {},
      accordionClick,
    } = {},
  } = props;

  const [showAccordion, setShowAccordion] = useState(false);

  const StyledOption = styled(components.Option)`
    background: ${isSelected ? "#eceaea !important" : "#eceaea !important"};
    color: #000000 !important;
    border-bottom: 1px solid #cac4c4;
  `;

  const handleRowClick = () => {
    setShowAccordion(!showAccordion);
  };

  const StyledOptionFlex = styled(Flex)`
    padding-bottom: 0.9%;
    border-bottom: ${showAccordion ? "1px solid #cac4c4" : "none"};
    cursor: pointer;
  `;

  const passAccordionData = () => {
    const selectedObj = {
      sortCode,
      accountHolderName,
      fullName,
      accountNumber,
      accountType,
      accountHolderType,
      balance,
      balanceText,
    };
    accordionClick(selectedObj);
  };

  return (
    <>
      <Flex tabIndex={2}>
        <StyledOption {...props}>
          <StyledOptionFlex onClick={handleRowClick}>
            <Box className="col-md-3">
              {formatSortCode(sortCode)} {"  "}
              {accountNumber}
            </Box>

            <Box className="type-holder">
              {accountType} . {accountHolderName}
            </Box>

            {isSelected && accountNumber === defaultAccountNumber && (
              <Box sx={{ width: "5%" }}>
                <StyledImage src="green-tick.png" />
              </Box>
            )}
          </StyledOptionFlex>

          {/* ********************************** Accordion Section ***********************************/}
          {showAccordion && (
            <Flex
              data-testid="accordion-area"
              sx={{ padding: "5px", position: "relative" }}
            >
              <Box
                sx={{ width: "10%", position: "absolute", bottom: "1.2rem" }}
              >
                <StyledArrowImg src="down-arrow.png" width="25px" />
              </Box>

              <Flex
                className="col-md-7"
                onClick={passAccordionData}
                sx={{ justifyContent: "space-evenly", cursor: "pointer" }}
              >
                <Box>
                  {formatSortCode(sortCode)}
                  {"  "}
                  {accountNumber}
                </Box>

                <Box>
                  {accountHolderType} . {fullName}
                </Box>
              </Flex>
            </Flex>
          )}
        </StyledOption>
      </Flex>
    </>
  );
};

const formatOptionLabel = (props) => {
  const { accountType, accountHolderName, accountNumber, sortCode } = props;
  return (
    <>
      <SingleAccount
        accountType={accountType}
        accountHolderName={accountHolderName}
        accountNumber={accountNumber}
        sortCode={sortCode}
        isSingleAccount={false}
      />
    </>
  );
};

const Dropdown = (props) => {
  const { options = [], defaultAccount = {} } = props;
  const [selectedAccount, setSelectedAccount] = useState(defaultAccount);

  useEffect(() => {
    const { selectedAccount } = props;
    setSelectedAccount(defaultAccount);
    selectedAccount(defaultAccount);
  }, [defaultAccount]);

  // const handleSelect = (selectedAccount) => {
  //   const {
  //     accountType,
  //     accountHolderName,
  //     accountNumber,
  //     sortCode,
  //   } = selectedAccount;
  //   const selectedAccountObj = {
  //     accountType,
  //     accountHolderName,
  //     accountNumber,
  //     sortCode,
  //   };
  //   setSelectedAccount(selectedAccountObj);
  // };

  const {
    sortCode,
    accountHolderName,
    accountNumber,
    accountType,
  } = selectedAccount;

  const handleAccordionClick = (selectedObj) => {
    const { selectedAccount } = props;
    const {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
      balance,
      balanceText,
    } = selectedObj;
    const selectedAccountObj = {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
      balance,
      balanceText,
    };
    setSelectedAccount(selectedAccountObj);
    selectedAccount(selectedAccountObj);
  };

  return (
    <>
      <Select
        id="select"
        className="select"
        options={options}
        components={{ Option: CustomOptions }}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        defaultValue={{
          sortCode,
          accountNumber,
          accountHolderName,
          accountType,
        }}
        // onChange={(selectedAccount) => handleSelect(selectedAccount)}
        value={selectedAccount}
        closeMenuOnSelect={false}
        isSearchable={false}
        accordionClick={handleAccordionClick}
        // menuIsOpen
        tabIndex={"0"}
        tabSelectsValue
      />
    </>
  );
};

export default Dropdown;
