import { useParams } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

import { useGetAutopartById } from '../../queries/autoparts.query';

import { AutopartMain } from './components/AutopartMain/AutopartMain';
import { AutopartHeader } from './components/AutopartHeader/AutopartHeader';
import { AutopartDescription } from './components/AutopartDescription/AutopartDescription';
import { AutopartFeedbacks } from './components/AutopartFeedbacks/AutopartFeedbacks';

import styles from './Autopart.module.scss';

const Autopart = () => {
  const { id = '' } = useParams();

  const { autopart, isAutopartLoading } = useGetAutopartById(id);

  return (
    <main className={styles.autopart}>
      <LoadingOverlay visible={isAutopartLoading} />
      <div className={styles.autopart__container}>
        <AutopartHeader
          name={autopart?.name}
          autopartId={id}
        />
        <AutopartMain
          attributes={autopart?.attributes}
          discount={autopart?.discount}
          images={autopart?.images}
          price={autopart?.price}
          quantity={autopart?.quantity}
        />
        <AutopartDescription description={autopart?.description} />
        <AutopartFeedbacks />
      </div>
    </main>
  );
};

export default Autopart;
