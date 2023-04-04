import {
  Button,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ITitleLookupProps from "../common/TitleLookupOptions";
import ApiServiceProvider from "../utils/ApiServiceProvider";
import { useMutation } from "react-query";
import IMovie from "../common/TitleLookupResponse";
import Constants from "../common/Constants";
interface ISearchFilmProps {
  selectedFilm?: IMovie;
  setFilm: (data?: IMovie) => void;
  setError: (data: any) => void;
  setLoading: (data: boolean) => void;
  setStopMedia: (data: boolean) => void;
}
export default function SearchFilmForm(props: ISearchFilmProps) {
  const [stopper, setStopper] = useState<boolean>(false);
  const defVals: { t: ""; year: ""; type: "" } = { t: "", year: "", type: "" };
  const { register, watch, reset, handleSubmit } = useForm<ITitleLookupProps>({
    defaultValues: defVals,
  });
  const selectedVals = watch();
  const { data, error, isLoading, mutate } = useMutation(
    async ({ body }: { body: ITitleLookupProps }) =>
      await ApiServiceProvider.TitleLookup(body)
  );
  useEffect(() => {
    if (error) props.setError(error);
    if (data) props.setFilm(data);
    if (selectedVals) setStopper(true);
    props.setLoading(isLoading);
  }, [error, data, isLoading, selectedVals, props]);
  return (
    <div>
      {stopper && (
        <form
          onSubmit={handleSubmit((data) => {
            props.setStopMedia(true);
            mutate({ body: data });
          })}
        >
          <Grid item sx={{ mb: 2 }}>
            <TextField
              label={"Title"}
              inputProps={register("t", { required: true })}
            />
            <FormControl sx={{ width: "20%", marginLeft: 2, marginRight: 2 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                inputProps={register("type")}
                label="Type"
                type="submit"
                renderValue={(value: string) => (
                  <Typography variant="subtitle2" sx={{ fontSize: 17 }}>
                    {value[0].toUpperCase()}
                    {value.slice(1, value.length)}
                  </Typography>
                )}
              >
                {Constants.mediaTypes.map((x) => (
                  <MenuItem value={x.toLowerCase()}>
                    <Typography variant="subtitle2" sx={{ fontSize: 17 }}>
                      {x}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label={"Year"} inputProps={register("year")} />
          </Grid>
          <Grid item>
            <Button
              color="error"
              variant="outlined"
              disabled={
                isLoading ||
                !Object.entries(selectedVals).find(
                  ([key, value]) => key === "t" && value
                )
              }
              sx={{ marginRight: 1 }}
              onClick={() => {
                reset(defVals);
                props.setStopMedia(false);
                props.setFilm(undefined);
                setStopper(false);
              }}
            >
              Clear
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              type="submit"
              variant="contained"
              disabled={
                isLoading ||
                !Object.entries(selectedVals).find(
                  ([key, value]) => key === "t" && value
                )
              }
            >
              Search
            </Button>
          </Grid>
        </form>
      )}
    </div>
  );
}
