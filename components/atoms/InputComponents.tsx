import { useForm } from "react-hook-form"

import { standardInput } from "@/utils/Tokens"

interface valuesSelect {
  value: string
  label: string
}
interface InputComponentsProps {
  label: string
  typeElement: "text" | "password"
  idElement: string
  nameRegister: string
  listValues?: valuesSelect[]
}

export default function InputComponents({ label, typeElement, idElement, listValues, nameRegister }: InputComponentsProps) {
  const { register } = useForm()
  return (
    <>
      <label htmlFor={ idElement } className="font-semibold">
        { label }
      </label>
      {
        listValues?.length ? (
          <select name="" id="">
            {
              listValues.map(item => (
                <option value={item.value}>{ item.label }</option>
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
  )
}
