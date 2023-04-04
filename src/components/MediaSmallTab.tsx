import { Grid, Box, Paper } from "@mui/material";
import IMovie from "../common/TitleLookupResponse";
interface ISmallMediaProps {
  movie: IMovie;
}
export default function SmallMediaTab(props: ISmallMediaProps) {
  const movie = props.movie;
  return (
    <Paper>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 1 }}
      >
        <Box
          component="img"
          sx={{ width: "60%", height: "35%" }}
          src={movie.Poster}
          alt={movie.Title}
        />
      </Grid>
    </Paper>
  );
}
