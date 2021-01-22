import { Flex } from "rebass";
import { StyledSmallText } from "./dropdownRebassStyles";
import { StyledBalanceAmount, StyledDRText } from "./singleAccountStyles";
import { formatAmount } from "./Utils/commonMethods";

const AvailableBalance = ({ balanceText, balance }) => {
  return (
    <>
      <Flex alignItems="baseline">
        <StyledSmallText>{balanceText}</StyledSmallText>
        <StyledBalanceAmount id="amount-text">
          {formatAmount(balance)}
        </StyledBalanceAmount>
        {balance < 0 ? <StyledDRText>{"DR"}</StyledDRText> : ""}
      </Flex>
    </>
  );
};

export default AvailableBalance;
