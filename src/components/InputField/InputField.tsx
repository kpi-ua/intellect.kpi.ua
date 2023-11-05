import FeatherIcon from '../FeatherIcon/FeatherIcon';
import CommonButton from '../CommonButton/CommonButton';
import feather from "feather-icons";
import React from "react";

type Props = {
    onInput?: (a: React.FormEvent<HTMLInputElement>) => void,
    buttonText: string,
    icon?: feather.FeatherIconNames,
    placeholder?: string,
    fieldClass?: string,
    buttonClass?: string
}

const InputField: React.FC<Props> = ({onInput = () => {}, buttonText, icon = '' as feather.FeatherIconNames, placeholder = '', fieldClass = '', buttonClass = ''}) => {
  return (
    <>
      {icon ? <FeatherIcon icon={icon} /> : null}
      <input
        className={fieldClass}
        placeholder={placeholder}
        onInput={(e: React.FormEvent<HTMLInputElement>) => onInput(e)}>
      </input>
      <CommonButton className={buttonClass}>{buttonText}</CommonButton>
    </>
  )
}

export default InputField;
