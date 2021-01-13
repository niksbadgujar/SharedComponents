import CardComponent from "./CardComponent";

const CardParent = (props) => {
  const sampleRequestTitle = "XXX / XXX";
  const accountNumber = "123456";
  const accountHolderName = "ABCD";

  const handleClick1 = () => {
    console.log('clicked 1');
  }

  const handleClick2 = () => {
    console.log('clicked 2');
  }

  return (
    <>
      <h3 className="mt-3 mb-4"> Sample Card View </h3>

      <CardComponent
        title={sampleRequestTitle}
        accountNumber={accountNumber}
        accountHolderName={accountHolderName}
        onButton1Click={handleClick1}
        onButton2Click={handleClick2}
      />
    </>
  );
};

export default CardParent;
