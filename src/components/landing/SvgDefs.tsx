export default function SvgDefs() {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="brand-gradient"
          gradientUnits="userSpaceOnUse"
          x1="2"
          y1="12"
          x2="22"
          y2="12"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="40%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
}
