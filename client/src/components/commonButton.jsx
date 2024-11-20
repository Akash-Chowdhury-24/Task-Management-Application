
import '../css/commonButton.css'


function CommonButton({type,onClick,disabled,buttonText}) {
  return (
    <button 
      type={type || "submit"}
      onClick={onClick || null}
      disabled ={disabled || false}
      className="button"
    >{buttonText}</button>
  );
}

export default CommonButton;