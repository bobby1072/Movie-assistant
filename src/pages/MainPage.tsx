import { Box, Grid } from "@mui/material";
import logo from "../images/logo.jpg";
import { useState } from "react";
import SearchFilmForm from "../components/SearchFilmForm";
import IMovie from "../common/TitleLookupResponse";
import SmallMediaTab from "../components/MediaSmallTab";
export default function MainPage() {
  const [media, setMedia] = useState<IMovie>();
  const [error, setError] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="App">
      <header className="App-header">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={{ mb: 2 }}>
            <Box
              component="img"
              sx={{ width: "100%", height: "30%" }}
              src={logo}
              alt="Movie assistant"
            />
            <SearchFilmForm
              setLoading={(data: boolean) => {
                setLoading(data);
              }}
              setError={(data: any) => {
                setError(data);
              }}
              setFilm={(data: IMovie) => {
                setMedia(data);
              }}
            />
          </Grid>
          {loading && (
            <Grid item>
              <p>Loading...</p>
            </Grid>
          )}
          {!loading && media && (
            <Grid item>
              <SmallMediaTab movie={media} />
            </Grid>
          )}
        </Grid>
      </header>
    </div>
  );
}
