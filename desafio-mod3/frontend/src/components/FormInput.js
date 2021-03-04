import React from 'react';

export default function FormInput({
  placeholder,
  id,
  min,
  step,
  labelDesc,
  value,
  onChange,
}) {
  return (
    <div className='input-field col s6'>
      <input
        placeholder={placeholder}
        id={id}
        type='number'
        className='validate'
        min={min}
        step={step}
        onChange={onChange}
        value={value ? value : ''}
      />
      <label className='active' htmlFor={id}>
        {labelDesc}
      </label>
    </div>
  );
}
