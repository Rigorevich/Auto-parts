import { ReactElement } from 'react';

import {
  CartIcon,
  FavoriteIcon,
  GarageIcon,
  LogoutIcon,
  OrderIcon,
  PhoneIcon,
  ProfileIcon,
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
    label: 'Мой гараж',
    route: PAGES.GARAGE,
    leftIcon: <GarageIcon />,
  },
  {
    label: 'Избранное',
    route: PAGES.FAVORITES,
    leftIcon: <FavoriteIcon />,
  },
];

export const SIDEBAR_PROFILE_DATA: SidebarOptionType[] = [
  {
    label: 'Профиль',
    route: PAGES.PROFILE_EDIT,
    leftIcon: <ProfileIcon />,
  },
  {
    label: 'Контактная информация',
    route: PAGES.PROFILE_CONTACTS,
    leftIcon: <PhoneIcon />,
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
  ['Система']: SIDEBAR_PROFILE_SYSTEM,
};
