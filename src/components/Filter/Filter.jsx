import { Checkbox } from '../Checkbox';

export const Filter = ({ control, filterableValues }) => {
  return (
    <div>
      {filterableValues.map((value) => (
        <Checkbox key={value} control={control} name={value} />
      ))}
    </div>
  );
};
