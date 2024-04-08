export default function CircularProgress({ value, max }) {
  const percentage = (value / max) * 100;

  let color;
  if (percentage >= 80) {
    color = "green";
  } else if (percentage >= 50) {
    color = "yellow";
  } else {
    color = "red";
  }

  return (
    <div
      className="relative flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${color} ${
          percentage * 3.6
        }deg,#ededed 0deg)`,
      }}
    >
      <div className="absolute flex h-[75%] w-[75%] items-center justify-center rounded-full bg-white">
        {value}
      </div>
    </div>
  );
}
