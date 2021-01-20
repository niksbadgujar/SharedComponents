// @ts-nocheck
import React from "react";
import { Box, Flex } from "rebass";
import {
  StyledHeaderText,
  StyledText,
  StyledBalanceText,
  StyledBalanceAmount,
  StyledDRText,
} from "./singleAccountStyles";
import { formatAmount, formatSortCode } from "./Utils/commonMethods";

const SingleAccount = (props) => {
  const { options = [], options: [{ balanceText, balance }] = [0] } = props;

  const formatOptionLabel = () => {
    const {
      accountType,
      accountHolderName,
      accountNumber,
      sortCode,
    } = options[0];
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

  return (
    <>
      <Box className="col-md-3">
        <Box marginTop="4px" marginLeft="2px" minWidth="40%">
          {formatOptionLabel()}
        </Box>
      </Box>

      <Box>
        <div>
          <Flex className="amount-section">
            <StyledBalanceAmount>
              <StyledBalanceText>{balanceText}</StyledBalanceText>
              {formatAmount(balance)}
              {balance < 0 ? <StyledDRText>{"DR"}</StyledDRText> : ""}
            </StyledBalanceAmount>
          </Flex>
        </div>
      </Box>
    </>
  );
};

export default SingleAccount;
