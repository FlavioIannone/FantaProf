export default function PointsBadge({ points }: { points?: number }) {
  if (!points) {
    return (
      <span className={`d-skeleton d-badge d-rounded-selector ms-2`}>
        <p className="invisible">pts</p>
      </span>
    );
  }

  const negative = points < 0;
  return (
    <span
      className={`d-badge ms-2 ${
        negative
          ? "d-badge bg-error/40 text-red-700"
          : "d-badge bg-success/40 text-green-700"
      }`}
    >
      {negative ? "-" : "+"}
      {Math.abs(points)}
      pts
    </span>
  );
}
