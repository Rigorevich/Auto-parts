import { FC } from 'react';
import { Avatar, Rating, ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { openConfirmModal } from '@mantine/modals';

import { Account } from '../../../../../../api/axios';
import { useDeleteFeedback } from '../../../../../../queries/feedbacks';

import styles from './FeedbackCard.module.scss';

export interface FeedbackCardProps {
  id: number;
  feedback: string;
  account?: Account;
  rating: number;
  currentAccount?: Account;
  onDelete?: VoidFunction;
}

export const getFullname = (name?: string, surname?: string) => {
  if (name && surname) {
    return name + ' ' + surname;
  } else if (name) {
    return name;
  } else if (surname) {
    return surname;
  } else {
    return 'Аноним';
  }
};

export const FeedbackCard: FC<FeedbackCardProps> = ({ id, feedback, account, rating, currentAccount, onDelete }) => {
  const { deleteFeedback } = useDeleteFeedback(onDelete);

  const handleDeleteFeedback = () => {
    openConfirmModal({
      title: 'Вы уверены?',
      centered: true,
      onConfirm: () => {
        if (id) {
          deleteFeedback(id.toString());
        }
      },
      labels: { cancel: 'Отмена', confirm: 'Удалить' },
      confirmProps: { color: 'red' },
    });
  };

  return (
    <div className={styles.feedback_card}>
      <Tooltip
        label={getFullname(account?.name, account?.surname)}
        withArrow
      >
        <Avatar
          className={styles.avatar}
          size="lg"
        />
      </Tooltip>
      <div className={styles.feedback}>{feedback}</div>
      {(currentAccount?.role === 1 || account?.id === currentAccount?.id) && (
        <ActionIcon
          className={styles.deleteFeedback}
          onClick={handleDeleteFeedback}
          variant="filled"
          color="red"
          aria-label="Settings"
        >
          <IconTrash style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      )}
      <Rating
        readOnly
        value={Number(rating)}
        className={styles.rating}
      />
    </div>
  );
};
