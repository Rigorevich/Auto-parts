import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ArrowRightIcon } from '../../../../components/ui/Icons/Icons';
import { SidebarOptionType, SIDEBAR_OPTIONS } from '../../constants/sidebar-options';
import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';

import styles from './Sidebar.module.scss';

export const SidebarOption = ({ option }: { option: SidebarOptionType }) => {
  const { pathname } = useLocation();
  const { handleLogOut } = useContext(AuthContext) as AuthContextInterface;

  const handleClick = (option: SidebarOptionType) => {
    if (option.label === 'Выйти из системы') {
      handleLogOut();
    }
  };

  return (
    <li className={styles.section__item}>
      <button
        className={classNames(styles.section__button, {
          [styles.active]: pathname === option.route,
        })}
        onClick={() => handleClick(option)}
      >
        <Link
          to={option.route}
          className={styles.section__button_link}
        >
          <span className={styles.section__button_leftIcon}>{option.leftIcon}</span>
          <span className={styles.section__button_text}>{option.label}</span>
          <ArrowRightIcon className={styles.section__button_rightIcon} />
        </Link>
      </button>
    </li>
  );
};

export const SidebarList = ({ options }: { options: SidebarOptionType[] }) => (
  <ul className={styles.section__list}>
    {options.map((option) => (
      <SidebarOption
        key={option.label}
        option={option}
      />
    ))}
  </ul>
);

export const Sidebar = () => {
  const { accountData } = useContext(AuthContext) as AuthContextInterface;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar__title}>Мои профиль</h2>
      <aside className={styles.sidebar__content}>
        {Object.keys(SIDEBAR_OPTIONS).map((title) => {
          if (title === 'Администрирование' && accountData?.role !== 1) {
            return;
          }

          return (
            <div
              key={title}
              className={styles.sidebar__section}
            >
              <h4 className={styles.section__title}>{title}</h4>
              <SidebarList options={SIDEBAR_OPTIONS[title]} />
            </div>
          );
        })}
      </aside>
    </div>
  );
};
