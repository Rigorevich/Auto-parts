import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Rating, Button, Loader } from '@mantine/core';
import { modals } from '@mantine/modals';

import { feedbacksSorting } from '../../constants/feedbacks-sorting';
import { useGetAllFeedbacks } from '../../../../queries/feedbacks';
import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';

import { FeedbackCard } from './components/FeedbackCard/FeedbackCard';
import { FeedbackForm } from './components/FeedbackForm/FeedbackForm';

import styles from './AutopartFeedbacks.module.scss';

export const AutopartFeedbacks: FC = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState<'default' | 'rating'>('default');
  const { accountData } = useContext(AuthContext) as AuthContextInterface;

  const { feedbacks, averageRating, isFeedbacksLoading, refetchFeedbacks } = useGetAllFeedbacks(id, sortBy);

  const handleAddFeedback = () => {
    modals.open({
      title: 'Написать отзыв',
      centered: true,
      size: 'lg',
      children: (
        <FeedbackForm
          autopartId={id}
          onSubmit={() => {
            modals.closeAll();
            refetchFeedbacks();
          }}
        />
      ),
    });
  };

  return (
    <div className={styles.autopart__feedbacks}>
      {isFeedbacksLoading && <Loader />}
      <div className={styles.content}>
        <Select
          placeholder="Сортировать отзывы"
          defaultValue={feedbacksSorting[0].value}
          unselectable="off"
          value={sortBy}
          onChange={(value) => setSortBy(value as 'default' | 'rating')}
          className={styles.select}
          data={feedbacksSorting}
        />
        <div className={styles.feedbacks}>
          {feedbacks && feedbacks.length > 0 ? (
            <ul className={styles.list}>
              {feedbacks.map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  id={feedback.id}
                  account={feedback.account}
                  feedback={feedback.feedback}
                  rating={Number(feedback.rating)}
                  currentAccount={accountData!}
                  onDelete={refetchFeedbacks}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.noFeedbacks}>На текущий момент нет отзывов</div>
          )}
        </div>
      </div>
      <div className={styles.controller}>
        <div className={styles.averageRating}>
          <Rating
            readOnly
            className={styles.stars}
            size="lg"
            value={averageRating}
          />
          <div className={styles.numbers}>{Math.round(averageRating || 0)} / 5</div>
        </div>
        <Button
          className={styles.addFeedback}
          color="orange"
          size="lg"
          onClick={handleAddFeedback}
        >
          Написать отзыв
        </Button>
      </div>
    </div>
  );
};
