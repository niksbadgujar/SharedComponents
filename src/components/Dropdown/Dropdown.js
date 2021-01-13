// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { Col, Row } from "reactstrap";
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
} from "./dropdownStyles";

const CustomOptions = React.memo(({ children, ...props }) => {
  const {
    data: {
      sortCode,
      accountHolderName,
      fullName,
      accountNumber,
      accountType,
      accountHolderType,
    } = {},
    isSelected,
    selectProps: {
      value: { accountNumber: defaultAccountNumber = "" } = {},
      accordionClick,
    } = {},
  } = props;

  console.log("props - ", props);
  const [showAccordion, setShowAccordion] = useState(false);

  const StyledOption = styled(components.Option)`
    background: ${isSelected ? "#eceaea !important" : "#eceaea !important"};
    color: #000000 !important;
    border-bottom: 1px solid #cac4c4;
  `;

  const handleRowClick = () => {
    setShowAccordion(!showAccordion);
  };

  const StyledOptionRow = styled(Row)`
    padding-bottom: 0.9%;
    border-bottom: ${showAccordion ? "1px solid #cac4c4" : "none"};
  `;

  const passAccordionData = () => {
    const selectedObj = {
      sortCode,
      accountHolderName,
      fullName,
      accountNumber,
      accountType,
      accountHolderType,
    };
    accordionClick(selectedObj);
  };

  return (
    <>
      <StyledOptionsContainer>
        <StyledOption {...props}>
          <StyledOptionRow>
            <StyledLeftTextSection onClick={handleRowClick}>
              {sortCode} {accountNumber}
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
                  {sortCode} {accountNumber}
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
  const {
    value,
    accountType,
    accountHolderName,
    accountNumber,
    sortCode,
  } = newProps;

  if (value === "") {
    return (
      <StyledRow>
        <StyledText>Please Select</StyledText>
      </StyledRow>
    );
  } else {
    return (
      <StyledRow>
        <StyledCol>
          <StyledRow>
            <StyledCol>
              <StyledHeaderText>
                {sortCode} {accountNumber}
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
  }
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
    // setSelectedAccount(selectedAccountObj);
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
    } = selectedObj;
    const selectedAccountObj = {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
    };
    setSelectedAccount(selectedAccountObj);
  };

  return (
    <>
      <Row className="mt-5 ml-5">
        <Col md={2}>
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
              // tabSelectsValue={false}
            />
          </StyledSelectContainer>
        </Col>
      </Row>
      <Row>
        <Col md={2}>Hello</Col>
      </Row>
    </>
  );
});

export default Dropdown;
