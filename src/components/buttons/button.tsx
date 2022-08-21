interface IButton {
  label?: string;
  colour?: string;
}

const Button = (props: IButton) => {
  const { label, colour } = props;

  return (
    <button
      className={`
        ${colour === "primary" && "bg-blue-500 hover:bg-blue-700"} 
        ${colour === "danger" && "bg-red-500 hover:bg-red-700"}
        text-white text-sm py-2 px-4 rounded`}
    >
      {label}
    </button>
  );
};

export default Button;
