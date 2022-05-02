const Select = ({
  label, changeInput, name, value, options, classes
}) => {
  const optionsJSX = options.map((option) => {
    return(
      <option key={option} value={option}>{option}</option>
    );
  });
  return (
    <div className={value.trim() ? "input-wrapper on" : "input-wrapper"}>
      <select className={classes} name={name} onChange={changeInput} value={value}>
        <option value=""></option>
        {optionsJSX}
      </select>
      <label>{label}</label>
    </div>
  );
};

export default Select;
