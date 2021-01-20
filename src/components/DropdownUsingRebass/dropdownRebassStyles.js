import styled from "styled-components";
import { Box } from "rebass";

export const StyledCol = styled(Box)`
  color: black;
  width: 151px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
`;

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

export const StyledImage = styled.img`
  width: 10px;
`;

export const StyledArrowImg = styled.img`
  width: 20px;
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
    paddingLeft: "0px",
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
    padding: "8px 0px",
  }),
  indicatorSeparator: (providedStyles) => ({
    ...providedStyles,
    backgroundColor: "#000000",
    height: "39px",
  }),
};

export const StyledSmallText = styled.div`
  font-size: 10px;
  margin-right: 4px;
`;

export const StyledDRText = styled.div`
  font-size: 10px;
  margin-left: 4px;
`;

export const StyledBalanceAmount = styled.div`
  font-size: 16px;
`;
