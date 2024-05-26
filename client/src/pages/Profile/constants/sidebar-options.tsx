import { ReactElement } from 'react';

import {
  CartIcon,
  FavoriteIcon,
  LogoutIcon,
  OrderIcon,
  ProfileIcon,
  UsersIcon,
  GarageIcon,
  AdminToolsIcon,
} from '../../../components/ui/Icons/Icons';
import { PAGES } from '../../../constants/pages';

export type SidebarOptionType = {
  label: string;
  leftIcon: ReactElement<SVGElement>;
  route: string;
};

export const SIDEBAR_PROFILE_ORDERS: SidebarOptionType[] = [
  {
    label: 'Корзина',
    route: PAGES.CART,
    leftIcon: <CartIcon />,
  },
  {
    label: 'Заказы',
    route: PAGES.ORDERS,
    leftIcon: <OrderIcon />,
  },
  {
    label: 'Избранное',
    route: PAGES.FAVORITES,
    leftIcon: <FavoriteIcon />,
  },
  {
    label: 'Мои автомобили',
    route: PAGES.MY_CARS,
    leftIcon: <GarageIcon />,
  },
];

export const SIDEBAR_PROFILE_DATA: SidebarOptionType[] = [
  {
    label: 'Профиль',
    route: PAGES.PROFILE_EDIT,
    leftIcon: <ProfileIcon />,
  },
  {
    label: 'Данные для входа',
    route: PAGES.ACCOUNT_EDIT,
    leftIcon: <AdminToolsIcon />,
  },
];

export const SIDEBAR_ADMIN_TOOLS: SidebarOptionType[] = [
  {
    label: 'Список пользователей',
    route: PAGES.ADMIN_PANEL,
    leftIcon: <UsersIcon />,
  },
];

export const SIDEBAR_PROFILE_SYSTEM: SidebarOptionType[] = [
  {
    label: 'Выйти из системы',
    route: '/',
    leftIcon: <LogoutIcon />,
  },
];

export const SIDEBAR_OPTIONS: Record<string, SidebarOptionType[]> = {
  ['Заказы']: SIDEBAR_PROFILE_ORDERS,
  ['Мой аккаунт']: SIDEBAR_PROFILE_DATA,
  ['Администрирование']: SIDEBAR_ADMIN_TOOLS,
  ['Система']: SIDEBAR_PROFILE_SYSTEM,
};
