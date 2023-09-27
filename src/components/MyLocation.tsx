import Button from "react-bootstrap/Button";

const MyLocation = () => {
  const handleOnClick = () => {
    return console.log("my location click");
  };

  return (
    <>
      <Button onClick={() => handleOnClick()}>Find my Location</Button>
    </>
  );
};

export default MyLocation;
