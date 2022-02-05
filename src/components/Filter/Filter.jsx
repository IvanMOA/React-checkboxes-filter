import { Checkbox } from '../Checkbox';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';

export const Filter = ({ control, filterableValues }) => {
  const [filteredFilterableValues, setFilteredFilterableValues] = useState([]);
  const { register, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });
  const searchTerm = watch('search');
  useEffect(() => {
    setFilteredFilterableValues(matchSorter(filterableValues, searchTerm));
  }, [searchTerm]);
  const isSearchTermEmpty = searchTerm === '';
  return (
    <div>
      <Input placeholder="Search" {...register('search')} />
      {filterableValues.map((value) => (
        <div
          className={
            !isSearchTermEmpty && !filteredFilterableValues.includes(value) ? 'hidden' : 'aw'
          }
        >
          <Checkbox key={value} control={control} name={value} />
        </div>
      ))}
    </div>
  );
};
