// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { Box, Button, Flex, Text } from "rebass";
import SingleAccount from "./SingleAccount";
import {
  StyledArrowImg,
  StyledCol, // keep
  StyledHeaderText,
  StyledImage,
  StyledText,
  customStyles,
  StyledBalanceAmount,
  StyledSmallText,
  StyledDRText,
} from "./dropdownRebassStyles";
import { formatAmount, formatSortCode } from "./Utils/commonMethods";

const CustomOptions = React.memo(({ children, ...props }) => {
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
});

const formatOptionLabel = (props) => {
  const { ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });
  const { accountType, accountHolderName, accountNumber, sortCode } = newProps;

  return (
    <>
      <Flex>
        <Box>
          <StyledHeaderText>
            {formatSortCode(sortCode)}
            {"  "}
            {accountNumber}
          </StyledHeaderText>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <StyledText>
            {accountType} . {accountHolderName}
          </StyledText>
        </Box>
      </Flex>
    </>
  );
};

const Dropdown = (props) => {
  const { options = [], defaultAccount = {}, isSingleAccount = false } = props;
  const [selectedAccount, setSelectedAccount] = useState({});

  useEffect(() => {
    setSelectedAccount(defaultAccount);
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
  };

  return (
    <>
      <Flex
        className="mt-1 ml-5 col-md-8"
        sx={{
          flexGrow: "3",
          justifyContent: "space-between",
          alignItems: `${isSingleAccount ? "center" : "baseline"}`,
        }}
      >
        {isSingleAccount ? (
          <SingleAccount options={options} />
        ) : (
          <>
            <Box className="col-md-3">
              <Select
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
                // isDisabled={true}
                tabIndex={"0"}
                tabSelectsValue
              />
            </Box>

            <Box>
              <Flex className="amount-section" alignItems="center">
                <StyledSmallText>{selectedAccount.balanceText}</StyledSmallText>
                <StyledBalanceAmount>
                  {formatAmount(selectedAccount.balance)}
                </StyledBalanceAmount>
                {selectedAccount.balance < 0 ? (
                  <StyledDRText>{"DR"}</StyledDRText>
                ) : (
                  ""
                )}
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default Dropdown;
