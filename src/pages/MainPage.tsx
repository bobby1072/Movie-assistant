import { Box, Grid } from "@mui/material";
import logo from "../images/logo.jpg";
export default function MainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid
          container
          direction="column"
          sx={{ width: "60%", gap: 3, padding: 3 }}
        >
          <Grid item>
            <Box
              component="img"
              sx={{ width: "70%", height: "70%" }}
              src={logo}
              alt="Movie assistant"
            />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}
