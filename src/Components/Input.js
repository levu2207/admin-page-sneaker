import PropTypes from "prop-types";
import Validators from './../helpers/propTypeValidators';


const Input = (props) => {
    const {inputRef, id, label, labelSize = 3, frmField, errMessage, lastRow = false, required = false, type="type", ...others} = props;
    let labelClass =`col-sm-${labelSize} col-form-label`;
    labelClass += `${required ? " required " : ""}`
    const inputClass = `form-control ${errMessage ? "is-invalid" : ""}`;
        
        return ( 
        <div className={`row ${lastRow ? "" : "mb-3"}`}>
        <label htmlFor={id} className={labelClass}>{label}</label>
        <div className="col-sm">
            { others["row"] > 1 ?
           (<textarea  ref={inputRef} id={id} {...others} {...frmField} className={inputClass}> </textarea>) :
           (<input type={type} ref={inputRef}  id={id} {...others} {...frmField} className={inputClass}/>)
            }
        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}        
        </div>
      </div> );
    }

Input.propTypes = {
    type: PropTypes.oneOf(["text", "email", "url", "tel", "password", "number", "search",]),
    inputRef: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string.isRequired,
    labelSize: Validators.numberBetween(1, 12),
    lastRow: PropTypes.bool,
    required: PropTypes.bool,
    frmField: PropTypes.object,
    errMessage: PropTypes.string,
    rows: PropTypes.number,
};

export default Input;