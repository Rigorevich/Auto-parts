import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, LoadingOverlay, Pagination, Select } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';

import { useGetSubcategoriesByCategoryId } from '../../queries/catalogs.query';
import { useGetAutopartsWithPagination } from '../../queries/autoparts.query';
import { PAGES } from '../../constants/pages';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

import { AutopartCard } from './AutopartCard/AutopartCard';
import { NavigationPanel } from './NavigationPanel/NavigationPanel';

import styles from './Autoparts.module.scss';

const Autoparts = () => {
  const [searchParams] = useSearchParams();
  const { accountData } = useContext(AuthContext) as AuthContextInterface;

  const subcategoryId = `${searchParams.get('subcategoryId')}`;
  const categoryId = `${searchParams.get('categoryId')}`;

  const [page, setPage] = useState(1);

  const { subcategories, isSubcategoriesLoading } = useGetSubcategoriesByCategoryId(categoryId);
  const { autoparts, totalCount, isAutopartsLoading } = useGetAutopartsWithPagination(page, undefined, subcategoryId);

  const navigate = useNavigate();

  const selectedSubcategory = useMemo(
    () => subcategories?.find((subcategory) => subcategory.id === Number(searchParams.get('subcategoryId'))),
    [searchParams, subcategories]
  );

  const handleChangePage = (value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <main className={styles.autoparts}>
      <div className={styles.autoparts__container}>
        <LoadingOverlay visible={isSubcategoriesLoading || isAutopartsLoading} />
        <h2 className={styles.autoparts__title}>
          {selectedSubcategory?.name} <span className={styles.autoparts__count}>{totalCount}</span>{' '}
        </h2>
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

            {accountData?.role === 1 && (
              <div className={styles.panel__admin}>
                <Button
                  size="xs"
                  color="orange"
                  onClick={() =>
                    navigate({
                      pathname: PAGES.ADMIN_AUTOPART,
                      search: `?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
                    })
                  }
                >
                  Добавить запчасть
                </Button>
              </div>
            )}
          </div>
          <div className={styles.autoparts__list}>
            {autoparts?.map((autopart, index) => (
              <AutopartCard
                key={index}
                autopart={autopart}
              />
            ))}
          </div>
        </div>
        {(!isSubcategoriesLoading || !isAutopartsLoading) && (
          <div className={styles.autoparts__pagination}>
            <Pagination
              total={Math.ceil((totalCount || 0) / 5)}
              value={page}
              onChange={handleChangePage}
              color="orange"
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Autoparts;
