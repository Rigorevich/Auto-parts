import { FC, useState } from 'react';
import { Input, Button } from '@mantine/core';

import { SearchIcon } from '../../../../ui/Icons/Icons';

import styles from './SearchPanel.module.scss';

export interface SearchPanelProps {
  onSearch?: VoidFunction;
}

export const SearchPanel: FC<SearchPanelProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.search_panel}>
      <Input
        type="search"
        size="md"
        radius="xs"
        placeholder="Поиск по названию запчасти"
        className={styles.search_panel__input}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        rightSection={<SearchIcon />}
      />
      <Button
        className={styles.search_panel__button}
        onClick={onSearch}
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
