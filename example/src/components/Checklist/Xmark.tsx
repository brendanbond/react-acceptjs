const Xmark = () => {
  return (
    <svg
      className="xmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle className="xmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path
        className="xmark__x"
        fill="none"
        d="M 19 19 L 33 33 M 19 33 L 33 19"
      />
    </svg>
  );
};

export default Xmark;
