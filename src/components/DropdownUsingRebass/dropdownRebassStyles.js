import styled from "styled-components";
import { Box, Flex, Text } from "rebass";

export const StyledRow = styled(Flex)`
  color: black;
`;
export const StyledCol = styled(Box)`
  color: black;
  width: 151px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
`;

export const StyledHeaderText = styled.text`
  overflow-wrap: break-word !important;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
`;

export const StyledText = styled.text`
  overflow-wrap: break-word !important;
  font-size: 14px;
`;

export const StyledLeftTextSection = styled.div`
  width: 20%;
  margin-left: 1%;
`;

export const StyledAccordionLeftText = styled.div`
  width: 20%;
  margin-left: 5%;
`;

export const StyledRightTextSection = styled.div`
  width: fit-content;
  text-align: left;
`;

export const StyledTickIconSection = styled.div`
  width: 5%;
`;

export const StyledImage = styled.img`
  width: 10px;
`;

export const StyledOptionsContainer = styled.div``;

export const StyledArea = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledArrowSection = styled.div`
  width: 10%;
  height: auto;
  position: absolute;
  bottom: 1.2rem;
`;

export const StyledArrowImg = styled.img`
  width: 20px;
`;

export const StyledAccordionRow = styled(Flex)`
  margin-top: 1%;
  margin-left: 0%;
  cursor: pointer;
`;

export const StyledSelectContainer = styled.div`
  margin: 0px;
  min-width: 40%;
`;

export const customStyles = {
  control: (providedStyles, state) => ({
    ...providedStyles,
    minHeight: 44,
    minWidth: 223,
    border: "none",
    boxShadow: state.isFocused
      ? "0 0 0 2px black !important"
      : "0 0 0 1px white !important",
    borderRadius: state.isFocused ? "1px" : "0px",
  }),
  valueContainer: (providedStyles) => ({
    ...providedStyles,
    overflow: "none",
  }),
  placeholder: (providedStyles) => ({ ...providedStyles, color: "black" }),
  menuList: (providedStyles) => ({
    ...providedStyles,
    overflowX: "hidden",
    paddingTop: "0px",
    paddingBottom: "0px",
  }),
  menu: (providedStyles) => ({
    ...providedStyles,
    width: "60rem",
    background: "#e6e6e6",
    marginTop: "1px",
    borderTop: "1px solid #b5aca8",
    borderRadius: "0px",
    boxShadow: "none",
    position: "relative",
  }),
  option: (providedStyles, state) => ({
    ...providedStyles,
  }),
  indicatorSeparator: (providedStyles) => ({
    ...providedStyles,
    backgroundColor: "#000000",
    height: "39px",
  }),
};

export const StyledBalanceContainer = styled.div`
  margin-top: 10px;
`;

export const StyledBalanceText = styled.text`
  font-size: 14px;
`;

export const StyledBalanceAmount = styled.text`
  font-size: 16px;
`;
