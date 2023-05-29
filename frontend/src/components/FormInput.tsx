import { UseFormRegisterReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

export interface FormInputProps {
  label?: string;
  register: UseFormRegisterReturn<any>;
}

export const FormInput = ({ label, register }: FormInputProps) => {
  const inputId = uuidv4();
  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
        {...register}
      ></input>
    </div>
  );
};