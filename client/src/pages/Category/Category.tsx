import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { LoadingOverlay } from '@mantine/core';

import { useCreateSubcatalog, useGetSubcategoriesByCategoryId } from '../../queries/catalogs.query';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { CatalogForm } from '../../components/layout/Catalog/CatalogForm';
import { Card, CardAddItem } from '../../components/ui/Card/Card';

import styles from './Category.module.scss';

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

const Category = () => {
  const { id = '' } = useParams();
  const { accountData } = useContext(AuthContext) as AuthContextInterface;
  const { subcategories, isSubcategoriesLoading, refetchSubcategories } = useGetSubcategoriesByCategoryId(id);
  const { createSubcatalog, isPending } = useCreateSubcatalog(refetchSubcategories);

  const navigate = useNavigate();

  const handleAddCatalog = () => {
    modals.open({
      centered: true,
      size: 'lg',
      children: (
        <CatalogForm
          onSubmit={(formValue) => {
            modals.closeAll();
            createSubcatalog({ categoryId: id, name: formValue.name, image: formValue.image[0] });
            refetchSubcategories();
          }}
        />
      ),
    });
  };

  if (isSubcategoriesLoading || isPending) {
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'md' }}
    />;
  }

  return (
    <main className={styles.category}>
      <div className={styles.category__container}>
        <h1 className={styles.catalog__title}>Выберите подкатегорию</h1>
        <div className={styles.catalog}>
          <div className={styles.catalog__list}>
            {subcategories?.map((subcategory) => {
              const imagePath = `${apiUrl}/${subcategory.image_path}`;
              const route = `/autoparts`;

              return (
                <Card
                  key={subcategory.id}
                  className={styles.catalog__card}
                  onClick={() =>
                    navigate({
                      pathname: route,
                      search: `?categoryId=${id}&subcategoryId=${subcategory.id}`,
                    })
                  }
                  option={{
                    name: subcategory.name,
                    image: imagePath,
                  }}
                />
              );
            })}
            {accountData?.role === 1 && <CardAddItem onAdd={handleAddCatalog} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Category;
