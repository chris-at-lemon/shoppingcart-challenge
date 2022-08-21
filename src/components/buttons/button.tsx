interface IButton {
  label?: string;
  colour?: string;
  size: string;
}

const Button = (props: IButton) => {
  const { label, colour, size } = props;

  return (
    <button
      className={`
        text-white rounded text-sm py-2 px-4
        ${colour === "primary" && "bg-blue-500 hover:bg-blue-700"} 
        ${colour === "danger" && "bg-red-500 hover:bg-red-700"}
        ${size === "md" && "text-sm py-2 px-4"}
        ${size === "sm" && "text-sm py-0 px-2"}
        `}
    >
      {label}
    </button>
  );
};

export default Button;
