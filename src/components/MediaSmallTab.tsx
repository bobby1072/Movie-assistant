import { Grid, Box, Paper, Typography } from "@mui/material";
import IMovie from "../common/TitleLookupResponse";
interface ISmallMediaProps {
  movie: IMovie;
}
export default function SmallMediaTab(props: ISmallMediaProps) {
  const movie = props.movie;
  return (
    <Paper sx={{ backgroundColor: "#f0f0f0" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ cursor: "pointer", padding: 0.5 }}
      >
        <Grid item>
          <Box
            component="img"
            sx={{ width: "60%", height: "30%" }}
            src={movie.Poster}
            alt={movie.Title}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ fontSize: 25 }}>
            {movie.Title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
            {movie.Year}
          </Typography>
        </Grid>
        <Grid item>
          {movie.Director !== "N/A" && (
            <Typography variant="subtitle2" sx={{ fontSize: 17 }}>
              Director: {movie.Director}
            </Typography>
          )}
          {movie.Director === "N/A" && movie.Writer !== "N/A" && (
            <Typography variant="subtitle2" sx={{ fontSize: 17 }}>
              Writer: {movie.Writer}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {movie.Runtime}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            IMDB rating: {movie.imdbRating}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
