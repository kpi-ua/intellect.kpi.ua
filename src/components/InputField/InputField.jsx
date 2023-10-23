import FeatherIcon from '../FeatherIcon/FeatherIcon';
import CommonButton from '../CommonButton/CommonButton';

const InputField = ({onInput = () => {}, buttonText, icon, placeholder, fieldClass, buttonClass}) => {
  return (
    <>
      {icon ? <FeatherIcon icon={icon} /> : null}
      <input
        className={fieldClass}
        placeholder={placeholder}
        onInput={e => onInput(e)}>
      </input>
      <CommonButton className={buttonClass}>{buttonText}</CommonButton>
    </>
  )
}

export default InputField;
