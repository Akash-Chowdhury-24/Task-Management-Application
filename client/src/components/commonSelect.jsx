

import "../css/commonSelect.css"

function CommonSelect({ name,id, label, options, value, onChange, placeholder }) {
  return (
    <div className="common-select-containner">
      <label 
        htmlFor={id} 
        className="common-select-label"
      >
        {label}
      </label>

      <select 
        name={name} 
        id={id} 
        value={value} 
        onChange={onChange} 
        className="common-select-select"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CommonSelect;
