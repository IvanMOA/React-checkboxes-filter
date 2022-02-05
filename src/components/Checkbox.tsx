import { Control, FieldValues, useController } from 'react-hook-form';
import { Checkbox as CHUICheckbox } from '@chakra-ui/react';
type CheckboxProps = {
  name: string;
  control: Control<FieldValues, any>;
};
export const Checkbox = ({ control, name }: CheckboxProps) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    defaultValue: false,
  });
  return (
    <div className="flex">
      <CHUICheckbox size="md" colorScheme="red" onChange={onChange} value={value}>
        {name}
      </CHUICheckbox>
    </div>
  );
};
