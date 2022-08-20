interface IButton {
  label?: string;
}

const Button = (props: IButton) => {
  const { label } = props;

  return <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded">{label}</button>;
};

export default Button;
