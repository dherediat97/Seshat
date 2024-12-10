import Typography from '@mui/material/Typography';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Review } from '../types/types';
import { fetchAllReviews } from '../api/fetchReviews';
import Searchbar from '../components/Searchbar';

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [query, setQuery] = useState('');

  const fetchReviews = async () => {
    const reviewResponse = await fetchAllReviews();
    setReviews(reviewResponse);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Searchbar query={query} setQuery={setQuery} />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {reviews.map((review) => (
          <>
            <ListItem key={review.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </>
                }
              />
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
}
