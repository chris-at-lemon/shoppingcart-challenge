interface IButton {
  label: string;
}

const Button = (props: IButton) => {
  const { label } = props;
  return <button className="">{label}</button>;
};

export default Button;
