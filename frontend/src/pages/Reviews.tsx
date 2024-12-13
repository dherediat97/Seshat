import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Review } from '../types/types';

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      <List sx={{ width: '100%' }}>
        {reviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemAvatar>
              <Avatar alt={review.authorName} />
            </ListItemAvatar>
            <ListItemText
              primary={`De ${review.authorName}`}
              secondary={`${review.title}... ${review.content}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
