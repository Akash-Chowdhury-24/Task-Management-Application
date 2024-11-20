import CommonButton from "./commonButton";
import CommonInput from "./commonInput";
import CommonSelect from "./commonSelect"
import '../css/commonForm.css'
import CommonHeading from "./commonHeading";


const initialState = {
  INPUT: 'input',
  SELECT: 'select',
  TEXT:'text',
}

function CommonForm({ formcontrol = [], handleSubmit, formData, setFormData, btnText }) {

  function show(formControlItem) {
    let content = null;

    switch (formControlItem.componentType) {
      case initialState.INPUT:
        content = <CommonInput
          type={formControlItem.type}
          placeholder={formControlItem.placeholder}
          value={formData[formControlItem.name]}
          onChange={(event) =>
            setFormData({
              ...formData,
              [event.target.name]: event.target.value,
            })
          }
          name={formControlItem.name}
          id={formControlItem.id}
          label={formControlItem.label}
          min={formControlItem.min}
          max={formControlItem.max}
        />
        break;

      case initialState.SELECT:
        content = <CommonSelect
          name={formControlItem.name}
          id={formControlItem.id}
          label={formControlItem.label}
          value={formData[formControlItem.name]}
          onChange={(event) =>
            setFormData({
              ...formData,
              [event.target.name]: event.target.value,
            })
          }
          options={formControlItem.options}
          placeholder={formControlItem.placeholder}
        />
        break;

        case initialState.TEXT:
          content = <CommonHeading text={formControlItem.text} />
          break;
      default:
        break;
    }
    return content;
  }
  return (
    <div className="commomn-form-card">
      <form
        className="common-form-form"
        onSubmit={handleSubmit}
      >
        {formcontrol.length > 0
          ? formcontrol.map((formControlItem, index) => (
            <div key={index}>
              {show(formControlItem)} 
            </div>
          ))
          : null}

        <div className="common-form-button-container">
          <CommonButton buttonText={btnText} />
        </div>
      </form>
    </div>

  );
}

export default CommonForm;