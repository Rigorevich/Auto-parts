import { FC } from 'react';
import { Loader, Select } from '@mantine/core';
import classNames from 'classnames';

import styles from './FilterSelect.module.scss';

export interface OptionProps {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  searchable?: boolean;
  data?: OptionProps[];
  value?: string | null;
  onChange: (value: string | null, option: any) => void;
  placeholder: string;
  isLoading?: boolean;
  className?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({
  data,
  value,
  searchable = true,
  onChange,
  className,
  placeholder,
  isLoading,
}) => (
  <Select
    searchable={searchable}
    data={data}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rightSection={isLoading && <Loader size="xs" />}
    className={classNames(className, styles.filter__select)}
  />
);
