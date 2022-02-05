import { Checkbox } from '../Checkbox';
import { useForm } from 'react-hook-form';
import { Input, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';
import { ChevronDownIcon } from '@chakra-ui/icons';
import clsx from 'clsx';
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
      <Menu>
        <MenuButton className="hover:bg-gray-100 rounded-md px-2 py-1">
          Filtros <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <div className="px-3 py-1">
            <Input
              className="mb-2"
              size="sm"
              autocomplete="off"
              autofill="off"
              placeholder="Search"
              {...register('search')}
            />
            {filterableValues.map((value) => (
              <div
                key={value}
                className={clsx('text-gray-600', {
                  hidden: !isSearchTermEmpty && !filteredFilterableValues.includes(value),
                })}
              >
                <Checkbox control={control} name={value} />
              </div>
            ))}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
};
