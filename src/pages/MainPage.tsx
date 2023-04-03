import { Box, Grid } from "@mui/material";
import logo from "../images/logo.jpg";
import { useState } from "react";
import SearchFilmForm from "../components/SearchFilmForm";
import IMovie from "../common/TitleLookupResponse";
export default function MainPage() {
  const [media, setMedia] = useState<IMovie>();
  const [error, setError] = useState<any>(undefined);
  return (
    <div className="App">
      <header className="App-header">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", padding: 3 }}
        >
          <Grid item>
            <Box
              component="img"
              sx={{ width: "100%", height: "30%" }}
              src={logo}
              alt="Movie assistant"
            />
            <SearchFilmForm
              setError={(data: any) => {
                setError(data);
              }}
              setFilm={(data: IMovie) => {
                setMedia(data);
              }}
            />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}
