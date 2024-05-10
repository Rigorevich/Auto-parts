import { AdminToolsIcon, CartIcon, FavoriteIcon, ProfileIcon } from '../../../ui/Icons/Icons';
import { PAGES } from '../../../../constants/pages';

export const CONTROLLER_ITEMS = [
  {
    tooltipLabel: 'Мой аккаунт',
    route: PAGES.PROFILE,
    icon: <ProfileIcon />,
  },
  {
    tooltipLabel: 'Корзина',
    route: PAGES.CART,
    icon: <CartIcon />,
  },
  {
    tooltipLabel: 'Админ панель',
    route: PAGES.ADMIN_PANEL,
    icon: <AdminToolsIcon />,
  },
  {
    tooltipLabel: 'Избранное',
    route: PAGES.FAVORITES,
    icon: <FavoriteIcon />,
  },
];
