// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "rebass";
import { optionsArray } from "./mockData";
import {
  StyledCol,
  StyledHeaderText,
  StyledRow,
  StyledSelectContainer,
  StyledText,
  StyledBalanceContainer,
  StyledBalanceText,
  StyledBalanceAmount,
  StyledIndicatorSeparator,
  StyledIndicatorsContainer,
  StyledIndicatorContainer,
} from "./dropdownRebassStyles";
import DownArrowSVG from "./DownArrowSVG";

const SingleAccount = React.memo((props) => {
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
  };

  const formatOptionLabel = () => {
    const {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
    } = selectedAccount;
    return (
      <StyledRow>
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
        <StyledIndicatorsContainer>
          <StyledIndicatorSeparator></StyledIndicatorSeparator>
          <StyledIndicatorContainer>
            <DownArrowSVG />
          </StyledIndicatorContainer>
        </StyledIndicatorsContainer>
      </StyledRow>
    );
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
            <StyledSelectContainer>{formatOptionLabel()}</StyledSelectContainer>
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

export default SingleAccount;
