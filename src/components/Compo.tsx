
import {
  Box,
  Typography,
  LinearProgress,
  Rating,
  Stack,
  Container,
} from "@mui/material";



interface ReviewRatingProps{
  reviewRating? : number[] | undefined,
  totalreview? : number | undefined;
  reviewcount? : number;
}

const Compo = ({reviewRating , totalreview , reviewcount} : ReviewRatingProps) => {
  return (
   
    <Container maxWidth="sm" sx={{
    m: 0,
    pl: 0,
    pr: 0,
  }} >
        
      <Typography sx={{ fontSize: "22px", fontWeight: "bold", px: 4 , pt : 5 , pb : 3 }} >
        Customer Reviews
      </Typography>
      <div className="flex gap-6 p-4">
      <Box >
        <Typography sx={{ fontSize: "36px", fontWeight: "bold" }}>
          {totalreview ? totalreview : 0}
        </Typography>
        <Box>
          <Rating value={(totalreview ? totalreview : 0) * 1.0} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
           {reviewcount} reviews
          </Typography>
        </Box>
      </Box>
     
    <Stack sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}>
        {reviewRating?.map((item , i) => (
          <Box
            key={item}
            display="flex"
            alignItems="center"
            sx={{ gap: 1, height: '21px' }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "medium", pt : 0.5}}>{i + 1}</Typography>
            <Typography  sx={{ fontSize: "14px", fontWeight: "medium" }}>
              ★
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={Number.isFinite(item) && (reviewcount ?? 0) > 0 ? (item / (reviewcount ?? 1)) * 100 : 0}
                sx={{
                  height: 8,
                  width: '250px',
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#000",
                  },
                }}
              />
            </Box>
            <Typography sx={{ width: 30, textAlign: "right" }}>
              {Number.isFinite(item) && reviewcount ? ((item / reviewcount) * 100).toFixed(0) + "%" : "0%"}
            </Typography>
          </Box>
        ))}
      </Stack>

      </div>
    </Container>
  
  )
}

export default Compo





