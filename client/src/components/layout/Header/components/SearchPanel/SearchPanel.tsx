import { FC, useState } from 'react';
import { Input, Button } from '@mantine/core';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { CrossIcon, SearchIcon } from '../../../../ui/Icons/Icons';
import { PAGES } from '../../../../../constants/pages';

import styles from './SearchPanel.module.scss';

export interface SearchPanelProps {}

export const SearchPanel: FC<SearchPanelProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get('search') ?? '');

  const handleSearch = () => {
    const filteredInputValue = inputValue.trim();

    if (filteredInputValue) {
      if (pathname === PAGES.AUTOPARTS) {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('search', filteredInputValue);

        setSearchParams(newParams);
      } else {
        navigate({
          pathname: '/autoparts',
          search: createSearchParams({
            search: filteredInputValue,
          }).toString(),
        });
      }
    }
  };

  const handleDeleteSearch = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('search');

    setSearchParams(newParams);
    setInputValue('');
  };

  return (
    <div className={styles.search_panel}>
      <div className={styles.search_panel__input}>
        <Input
          type="search"
          size="md"
          radius="xs"
          placeholder="Поиск по названию запчасти"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          rightSection={<SearchIcon />}
        />
        {searchParams.get('search') && (
          <button
            className={styles.cross}
            onClick={handleDeleteSearch}
          >
            <CrossIcon
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      <Button
        className={styles.search_panel__button}
        onClick={handleSearch}
        disabled={!inputValue}
        color="violet"
        size="md"
        radius="xs"
      >
        Найти запчасти
      </Button>
    </div>
  );
};
