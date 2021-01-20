import { Flex, Box } from "rebass";

const FlexBox = (props) => {
  return (
    <>
      <Flex
        sx={{
          margin: "10px",
          padding: "20px",
          border: "1px solid black",
          justifyContent: "space-between",
        }}
      >
        <Flex
          sx={{
            flexGrow: "3",
            justifyContent: "space-between",
            border: "1px solid black",
            padding: "1%",
            marginRight: "1%",
          }}
        >
          <Box sx={{ padding: "10px", width: "20%", background: "red" }}>
            Box 1
          </Box>
          <Box sx={{ padding: "10px", width: "20%", background: "blue" }}>
            Box 2
          </Box>
        </Flex>

        <Flex
          sx={{
            flexGrow: "1",
            border: "1px solid black",
            alignItems: "stretch",
          }}
        >
          <Box sx={{ padding: "10px", flexGrow: "1", background: "yellow" }}>
            Box 3
          </Box>
          <Box sx={{ padding: "10px", flexGrow: "1", background: "limegreen" }}>
            Box 4
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default FlexBox;
