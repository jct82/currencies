const Input = ({
  type, label, changeInput, name, value, classes
}) => {
  return (
    <div className={value.trim() ? "input-wrapper on" : "input-wrapper"}>
      <input className={classes} type={type} name={name} onChange={changeInput} value={value} />
      <label>{label}</label>
      <div className="line" />
    </div>
  );
};

export default Input;
