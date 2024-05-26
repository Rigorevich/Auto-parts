import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, LoadingOverlay, Pagination, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useGetSubcategoriesByCategoryId } from '../../queries/catalogs.query';
import { PAGES } from '../../constants/pages';

import { AutopartCard } from './AutopartCard/AutopartCard';
import { NavigationPanel } from './NavigationPanel/NavigationPanel';

import styles from './Autoparts.module.scss';

const Autoparts = () => {
  const [searchParams] = useSearchParams();
  const { subcategories, isSubcategoriesLoading } = useGetSubcategoriesByCategoryId(
    `${searchParams.get('categoryId')}`
  );

  const navigate = useNavigate();

  const selectedSubcategory = useMemo(
    () => subcategories?.find((subcategory) => subcategory.id === Number(searchParams.get('subcategoryId'))),
    [searchParams, subcategories]
  );

  if (isSubcategoriesLoading) {
    <LoadingOverlay visible />;
  }

  return (
    <main className={styles.autoparts}>
      <div className={styles.autoparts__container}>
        <h2 className={styles.autoparts__title}>{selectedSubcategory?.name}</h2>
        <NavigationPanel options={subcategories} />
        <div className={styles.autoparts__content}>
          <div className={styles.autoparts__panel}>
            <div className={styles.panel__sorting}>
              <span>Сортировка:</span>
              <Select
                data={['По умолчанию', 'Цена', 'Рейтинг']}
                defaultValue="По умолчанию"
                allowDeselect={false}
                size="xs"
              />
            </div>

            <div className={styles.panel__admin}>
              <Button
                size="xs"
                color="orange"
                onClick={() =>
                  navigate({
                    pathname: PAGES.ADMIN_AUTOPART,
                    search: `?categoryId=${searchParams.get('categoryId')}&subcategoryId=${searchParams.get('subcategoryId')}`,
                  })
                }
              >
                Добавить запчасть
              </Button>
            </div>
          </div>
          <div className={styles.autoparts__list}>
            {[...new Array(5)].map((_, index) => (
              <AutopartCard key={index} />
            ))}
          </div>
        </div>
        <div className={styles.autoparts__pagination}>
          <Pagination
            total={5}
            color="orange"
          />
        </div>
      </div>
    </main>
  );
};

export default Autoparts;
