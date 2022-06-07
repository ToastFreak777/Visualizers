import "./Ball.css";

const Ball = ({ index, value, color }) => {
  const colors = [
    [
      "radial-gradient(circle at 30% 30%,rgba(61,90,241,0.7),rgb(0, 0, 0, 0.8))",
      "radial-gradient(circle at 30% 30%,rgba(61,90,241,0.2),black)",
    ],
    [
      "radial-gradient(circle at 30% 30%,rgba(255,48,79, 1),rgb(0, 0, 0, 0.8))",
      "radial-gradient(circle at 30% 30%,rgba(255,48,79, 0.2),rgb(0, 0, 0, 0.8))",
    ],
    [
      "radial-gradient(circle at 30% 30%,rgba(131,232,90,1),rgb(0, 0, 0, 0.8))",
      "radial-gradient(circle at 30% 30%,rgba(131,232,90,0.2),rgb(0, 0, 0, 0.8))",
    ],
  ];

  const ballStyle = {
    background: `${colors[color][0]}`,
  };

  console.log();

  return (
    <>
      <div className="ball" style={ballStyle}>
        {value}
      </div>
    </>
  );
};

export default Ball;
