import { FC, useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';

import { SearchIcon } from '../../../../components/ui/Icons/Icons';
import { useDebounce } from '../../../../hooks/useDebounce';

export interface SearchInputProps {
  onChange: (search: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <TextInput
      placeholder="Поиск пользователя"
      mb="md"
      leftSection={<SearchIcon />}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};
