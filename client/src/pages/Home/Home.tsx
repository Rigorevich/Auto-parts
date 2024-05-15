import { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Filter } from '../../components/layout/Filter/Filter';
import { Card, CardAddItem } from '../../components/ui/Card/Card';
import { useGetAllCategories } from '../../queries/catalogs.query';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

import { CreateCatalogForm } from './components/CreateCatalogForm/CreateCatalogForm';

import styles from './Home.module.scss';

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

const Home = () => {
  const { accountData } = useContext(AuthContext) as AuthContextInterface;
  const { categories, isCategoriesLoading, refetchCategories } = useGetAllCategories();

  const handleAddCatalog = () => {
    modals.open({
      centered: true,
      children: (
        <CreateCatalogForm
          onSubmit={() => {
            modals.closeAll();
            refetchCategories();
          }}
        />
      ),
    });
  };

  if (isCategoriesLoading) {
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'md' }}
    />;
  }

  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        <Filter />
        <h1 className={styles.catalog__title}>Каталог автозапчастей</h1>
        <div className={styles.catalog}>
          <div className={styles.catalog__list}>
            {categories?.map((category) => (
              <Card
                key={category.id}
                option={{
                  name: category.name,
                  image: `${apiUrl}/${category.image_path}`,
                }}
              />
            ))}
            {accountData?.role === 1 && <CardAddItem onAdd={handleAddCatalog} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
