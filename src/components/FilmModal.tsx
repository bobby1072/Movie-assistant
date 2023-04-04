import { Box, Button, Grid, Typography } from "@mui/material";
import IMovie from "../common/TitleLookupResponse";

interface IFilmModalProps {
  movie: IMovie;
  setFilmModal: (data: boolean) => void;
}
export default function FilmModal(props: IFilmModalProps) {
  const { movie, setFilmModal } = props;
  return (
    <div className="modal">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 0.5 }}
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
            Runtime: {movie.Runtime}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Genre: {movie.Genre}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Plot: {movie.Plot}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Language: {movie.Language}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Country: {movie.Country}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Actors: {movie.Actors}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Website: {movie.Website}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            IMDB rating: {movie.imdbRating}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              setFilmModal(false);
            }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
