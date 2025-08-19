
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface RatingComponentProps {
  rating: string;
}

const RatingComponent = ({rating} : RatingComponentProps) => {

  const numericRating = parseFloat(rating) || 0;
  return (
     <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={numericRating} precision={0.5} />
    </Stack>
  )
}

export default RatingComponent