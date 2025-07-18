export const getScoreIndicator = (score: number) => {
  let color = "gray";

  if (score >= 7) {
    color = "green";
  } else if (score >= 4) {
    color = "yellow";
  } else if (score >= 0) {
    color = "red";
  }

  // If error score (-1), use gray
  const circleStyle = {
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: color,
    marginRight: "0.5rem",
  };

  return <span style={circleStyle} title={`Score: ${score}`}></span>;
}