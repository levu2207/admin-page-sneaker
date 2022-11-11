/**
 * Validate number between min and max
 * @param {number} min - LBound value, inclusive
 * @param {number} max - UBound value, inclusive
 * @param {boolean} [isRequired=false] - Optional. Field is required or not
 * @example
 * // validate number between 1 and 12, field is optional
 * Validators.numberBetween(1, 12)
 * @returns {(Error|ErrorType|String)} return Error or null
 */
 const numberBetween = (min, max, isRequired = false) => {
    return (props, propName, componentName) => {
        const propValue = props[propName];
        if (isRequired) {
            if (!propValue) {
                return new Error(`Prop ${propName} is required on ${componentName}`);
            };
        };
        
        if (propValue) {
            if (typeof propValue !== "number") {
                return new Error(`Prop ${propName} must be a number on ${componentName}`);
            };
            if (propValue < min || propValue > max) {
                return new Error(`Prop ${propName} value must in ${min} and ${max} on ${componentName}`);
            };
        };
    };
};

const Validators = {
    numberBetween
};

export default Validators;