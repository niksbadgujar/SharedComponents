import { Flex, Box, Button } from "rebass";

const DropdownHeader = ({ children }) => {
  return (
    <>
      <Flex
        className="outer-flex"
        justifyContent="space-between"
        padding="10px"
      >
        {children}
        <Flex
          className="mt-1"
          sx={{
            justifyContent: "space-around",
            height: "54px",
            alignItems: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Box>
            <Button
              title="Button 1"
              sx={{
                background: "#3d5879",
                color: "#FFFFFF",
                borderRadius: "0px",
                cursor: "pointer",
                marginRight: "5px",
              }}
            >
              Proceed
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
                marginRight: "5px",
              }}
            >
              View Statement
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DropdownHeader;
