import {
  Button,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApiServiceProvider from "../utils/ApiServiceProvider";
import { useMutation } from "react-query";
import IMovie from "../common/TitleLookupResponse";
import Constants from "../common/Constants";
import ILookupProps from "../common/TitleLookupOptions";
interface ISearchFilmProps {
  movie?: IMovie;
  setFilm: (data?: IMovie) => void;
  setError: (data: any) => void;
  setLoading: (data: boolean) => void;
  setStopMedia: (data: boolean) => void;
}
export default function SearchFilmForm(props: ISearchFilmProps) {
  const [stopper, setStopper] = useState<boolean>(false);
  const [idSearch, setIdSearch] = useState<boolean>(false);
  const { register, watch, reset, handleSubmit } = useForm<ILookupProps>({
    defaultValues: { t: "", year: "", type: "" },
  });
  const selectedVals = watch();
  const { isLoading, mutate } = useMutation(
    async ({ body }: { body: ILookupProps }) =>
      await ApiServiceProvider.TitleLookup(body),
    {
      onSuccess: (data) => {
        props.setError(undefined);
        props.setFilm(data);
      },
      onError: (error) => {
        props.setFilm(undefined);
        props.setError(error);
      },
    }
  );
  useEffect(() => {
    if (selectedVals) setStopper(true);
    props.setLoading(isLoading);
  }, [isLoading, selectedVals, props]);
  const clearAll = () => {
    reset(
      idSearch ? { i: "", year: "", type: "" } : { t: "", year: "", type: "" }
    );
    props.setError(undefined);
    props.setStopMedia(false);
    props.setFilm(undefined);
    setStopper(false);
  };
  return (
    <div>
      {stopper && (
        <form
          onSubmit={handleSubmit((data) => {
            props.setStopMedia(true);
            mutate({ body: data });
          })}
        >
          <Grid item>
            <Switch
              inputProps={{ "aria-label": "Toggle" }}
              checked={idSearch}
              onClick={() => {
                if (idSearch) setIdSearch(false);
                else setIdSearch(true);
                clearAll();
              }}
            />
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            {idSearch ? (
              <TextField
                label={"Imdb id"}
                inputProps={register("i", { required: true })}
              />
            ) : (
              <TextField
                label={"Title"}
                inputProps={register("t", { required: true })}
              />
            )}
            <FormControl sx={{ width: "20%", marginLeft: 2, marginRight: 2 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                inputProps={register("type")}
                label="Type"
                type="submit"
                renderValue={(value: string) => (
                  <Typography variant="subtitle2" sx={{ fontSize: 15 }}>
                    {value[0].toUpperCase()}
                    {value.slice(1, value.length)}
                  </Typography>
                )}
              >
                {Constants.mediaTypes.map((x) => (
                  <MenuItem value={x.toLowerCase()}>
                    <Typography variant="subtitle2" sx={{ fontSize: 15 }}>
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
              variant="outlined"
              disabled={Boolean(
                isLoading ||
                  (props.movie
                    ? false
                    : true &&
                      !Object.values(selectedVals).find((value) => value))
              )}
              sx={{ marginRight: 1 }}
              onClick={clearAll}
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
                  ([key, value]) => (key === "t" || key === "i") && value
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
