'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormSelectProps {
  formProps: any
  items: { value: string; label: string }[]
}
const FormSelect: React.FC<FormSelectProps> = ({ formProps, items }) => {
  return (
    <Select onValueChange={formProps.onChange} {...formProps}>
      <SelectTrigger>
        <SelectValue placeholder='Select a value' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item.value}
                className='hover:bg-gray-100'
              >
                {item.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FormSelect
