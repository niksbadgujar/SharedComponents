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
            flexGrow: "1",
            justifyContent: "space-between",
            height: "54px",
            alignItems: "center",
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
              }}
            >
              Proceed for Transaction
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
              View Statement
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DropdownHeader;
