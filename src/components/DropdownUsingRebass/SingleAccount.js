// @ts-nocheck
import React from "react";
import { Box, Flex } from "rebass";
import { StyledHeaderText, StyledText } from "./singleAccountStyles";
import { formatSortCode } from "./Utils/commonMethods";

const SingleAccount = ({
  accountType,
  accountHolderName,
  accountNumber,
  sortCode,
}) => {
  return (
    <>
      <Box className="box-class" marginTop="4px">
        <Flex>
          <Box>
            <StyledHeaderText id="header-text">
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
      </Box>
    </>
  );
};

export default SingleAccount;
