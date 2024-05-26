import { AutopartForm } from './AutopartForm/AutopartForm';

import styles from './AdminAutopart.module.scss';

const AdminAutopart = () => {
  return (
    <main className={styles.autopart}>
      <div className={styles.autopart__container}>
        <AutopartForm />
      </div>
    </main>
  );
};

export default AdminAutopart;
