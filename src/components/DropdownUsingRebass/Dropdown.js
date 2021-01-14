// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { Box, Button, Flex, Text } from "rebass";
import { optionsArray } from "./mockData";
import {
  StyledAccordionLeftText,
  StyledOptionsContainer,
  StyledAccordionRow,
  StyledArea,
  StyledArrowImg,
  StyledArrowSection,
  StyledCol,
  StyledHeaderText,
  StyledImage,
  StyledLeftTextSection,
  StyledRightTextSection,
  StyledRow,
  StyledSelectContainer,
  StyledText,
  StyledTickIconSection,
  customStyles,
  StyledBalanceContainer,
  StyledBalanceText,
  StyledBalanceAmount,
} from "./dropdownRebassStyles";

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

  // console.log("props - ", props);
  const [showAccordion, setShowAccordion] = useState(false);

  const StyledOption = styled(components.Option)`
    background: ${isSelected ? "#eceaea !important" : "#eceaea !important"};
    color: #000000 !important;
    border-bottom: 1px solid #cac4c4;
  `;

  const handleRowClick = () => {
    setShowAccordion(!showAccordion);
  };

  const StyledOptionRow = styled(Flex)`
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
      <StyledOptionsContainer tabIndex={2}>
        <StyledOption {...props}>
          <StyledOptionRow onClick={handleRowClick}>
            <StyledLeftTextSection>
              {sortCode !== undefined
                ? sortCode.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3")
                : ""}{" "}
              {accountNumber}
            </StyledLeftTextSection>

            <StyledRightTextSection>
              {accountType} . {accountHolderName}
            </StyledRightTextSection>

            {isSelected && accountNumber === defaultAccountNumber && (
              <StyledTickIconSection>
                <StyledImage src="green-tick.png" />
              </StyledTickIconSection>
            )}
          </StyledOptionRow>

          {/* ********************************** Accordion Section ***********************************/}

          {showAccordion && (
            <StyledArea data-testid="accordion-area">
              <StyledArrowSection>
                <StyledArrowImg src="down-arrow.png" width="25px" />
              </StyledArrowSection>

              <StyledAccordionRow onClick={passAccordionData}>
                <StyledAccordionLeftText>
                  {sortCode !== undefined
                    ? sortCode.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3")
                    : ""}{" "}
                  {accountNumber}
                </StyledAccordionLeftText>

                <StyledRightTextSection>
                  {accountHolderType} . {fullName}
                </StyledRightTextSection>
              </StyledAccordionRow>
            </StyledArea>
          )}
        </StyledOption>
      </StyledOptionsContainer>
    </>
  );
});

const formatOptionLabel = (props) => {
  const { ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });
  const { accountType, accountHolderName, accountNumber, sortCode } = newProps;

  return (
    <StyledRow tabIndex={"1"}>
      <StyledCol>
        <StyledRow>
          <StyledCol>
            <StyledHeaderText>
              {sortCode !== undefined
                ? sortCode.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3")
                : ""}{" "}
              {accountNumber}
            </StyledHeaderText>
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol>
            <StyledText>
              {accountType} . {accountHolderName}
            </StyledText>
          </StyledCol>
        </StyledRow>
      </StyledCol>
    </StyledRow>
  );
};

const Dropdown = React.memo((props) => {
  const StyledSelect = styled(Select)``;

  const [options, setOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});

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
    setSelectedAccount(modifiedAccountsArray[0]);
    setOptions(modifiedAccountsArray);
  };

  const handleSelect = (selectedAccount) => {
    const {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
    } = selectedAccount;
    const selectedAccountObj = {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
    };
    setSelectedAccount(selectedAccountObj);
  };

  const defaultValue = options[0] || {};
  const {
    sortCode,
    accountHolderName,
    accountNumber,
    accountType,
  } = defaultValue;

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
      <Flex>
        <Flex
          className="mt-5 ml-5"
          sx={{
            width: "70%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "26%" }}>
            <StyledSelectContainer>
              <StyledSelect
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
            </StyledSelectContainer>
          </Box>

          <Box
            sx={{
              width: "fit-content",
              height: "64px",
              marginRight: "6%",
            }}
          >
            <StyledBalanceContainer>
              <StyledBalanceText>
                {selectedAccount.balanceText}
              </StyledBalanceText>
              <StyledBalanceAmount>
                {" $"}
                {selectedAccount.balance}
              </StyledBalanceAmount>
            </StyledBalanceContainer>
          </Box>
        </Flex>
        <Flex
          sx={{ width: "30%", justifyContent: "space-evenly" }}
          className="mt-5"
        >
          <Box>
            <Button
              title="Button 1"
              sx={{
                background: "#3d5879",
                color: "#FFFFFF",
                borderRadius: "0px",
                cursor: "pointer",
              }}
            >
              Button 1
            </Button>
          </Box>
          <Box>
            <Button
              title="Button 1"
              sx={{
                background: "#3d5879",
                color: "#FFFFFF",
                borderRadius: "0px",
                cursor: "pointer",
              }}
            >
              Button 2
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
});

export default Dropdown;
