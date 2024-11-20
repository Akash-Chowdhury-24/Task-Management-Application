import '../css/commonInput.css'

function CommonInput({name,id,label,type,placeholder,value,onChange,min = undefined, max = undefined }) {
  return (
    <div className='common-input-containner'>
      <label 
        htmlFor={id}
        className="common-input-label"
      >
        {label}
      </label>
 
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className="common-input-input"
        min={min} 
        max={max}
      />
    </div>
  );
}

export default CommonInput;