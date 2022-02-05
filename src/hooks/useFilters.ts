import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
export const useFilters = <T>(
  filterableValues: string[],
  filterCondition: (filterableValues: string[]) => (data: T) => boolean,
  data: T[]
) => {
  const { control, watch } = useForm();
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const filters = watch();
  const prevFiltersRef = useRef<typeof filters>();
  useEffect(() => {
    const selectedFilterableValues = filterableValues.filter(
      (filterableValue) => filters[filterableValue]
    );
    if (
      selectedFilterableValues.length > 0 &&
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)
    ) {
      const newFilteredData = data.filter(filterCondition(selectedFilterableValues));
      setFilteredData(newFilteredData);
    } else if (selectedFilterableValues.length === 0) setFilteredData(data);
    prevFiltersRef.current = filters;
  }, [filters]);
  return {
    control,
    watch,
    filteredData,
  };
};
