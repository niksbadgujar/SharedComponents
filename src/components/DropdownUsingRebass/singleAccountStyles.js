import styled from "styled-components";
import { Box, Flex } from "rebass";

export const StyledHeaderText = styled.span`
  overflow-wrap: break-word !important;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
`;

export const StyledText = styled.span`
  overflow-wrap: break-word !important;
  font-size: 14px;
`;

export const StyledBalanceContainer = styled.div`
  margin-top: 10px;
`;

export const StyledBalanceText = styled.span`
  font-size: 10px;
  margin-right: 4px;
`;

export const StyledDRText = styled.span`
  font-size: 10px;
  margin-left: 4px;
`;

export const StyledBalanceAmount = styled.span`
  font-size: 16px;
`;

export const StyledIndicatorSeparator = styled.span`
  align-self: stretch;
  background-color: #000000;
  margin-bottom: 5px;
  margin-top: 5px;
  width: 1px;
  box-sizing: border-box;
  height: 39px;
`;

export const StyledIndicatorsContainer = styled(Flex)`
  margin-left: 13.4%;
  margin-bottom: 1px;
`;

export const StyledIndicatorContainer = styled(Box)`
  color: hsl(0, 0%, 80%);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 8px;
  -webkit-transition: color 150ms;
  transition: color 150ms;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
`;
