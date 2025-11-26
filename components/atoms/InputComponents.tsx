import { UseFormRegisterReturn } from "react-hook-form"
import { standardInput } from "@/utils/Tokens"

interface valuesSelect {
  value: string
  label: string
}

interface InputComponentsProps {
  label: string
  typeElement?: "text" | "password" | "email" | "tel" | "date" | "number"
  idElement: string
  nameRegister?: string
  register?: UseFormRegisterReturn
  listValues?: valuesSelect[]
  placeholder?: string
  error?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export default function InputComponents({ 
  label, 
  typeElement = "text", 
  idElement, 
  listValues, 
  nameRegister,
  register,
  placeholder,
  error,
  required = false,
  className = "",
  disabled = false
}: InputComponentsProps) {
  return (
    <div className="w-full">
      <label htmlFor={idElement} className="font-semibold block mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
<<<<<<< HEAD
      {
        listValues?.length ? (
          <select name="" id="">
            {
              listValues.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
              ))
            }
          </select>
        ) : (
          <input
            {...register(nameRegister)}
            type={ typeElement === "text" ? "text" : "password" }
            id={ idElement }
            className={standardInput}
          />
        )
      }
    </>
=======
      {listValues?.length ? (
        <select 
          id={idElement}
          {...register}
          className={`${standardInput} ${error ? "border-red-500" : ""} ${className}`}
          disabled={disabled}
        >
          <option value="">Seleccione una opción</option>
          {listValues.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register}
          type={typeElement}
          id={idElement}
          placeholder={placeholder}
          className={`${standardInput} ${error ? "border-red-500" : ""} ${className}`}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
  )
}
