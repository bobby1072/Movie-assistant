import {
  Button,
  FormControl,
  Grid,
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
interface ISearchFilmProps {
  setFilm: (data: IMovie) => void;
  setError: (data: any) => void;
}
export default function SearchFilmForm(props: ISearchFilmProps) {
  const { register, watch, reset, handleSubmit } = useForm<ITitleLookupProps>({
    defaultValues: { t: "" },
  });
  const selectedVals = watch();
  const [stopper, setStopper] = useState<boolean>(false);
  const { data, error, isLoading, mutate } = useMutation(
    async ({ body }: { body: ITitleLookupProps }) =>
      await ApiServiceProvider.TitleLookup(body)
  );
  useEffect(() => {
    if (data) props.setFilm(data);
  }, [data, props]);
  useEffect(() => {
    setStopper(true);
  }, [selectedVals]);
  useEffect(() => {
    if (error) props.setError(error);
  }, [error, props]);
  const mediaTypes = ["Movie", "Episode", "Game", "Series"];
  return (
    <div>
      {stopper && (
        <form
          onSubmit={handleSubmit((data) => {
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
                renderValue={(value: string) => <small>{value}</small>}
              >
                {mediaTypes.map((x) => (
                  <MenuItem value={x.toLowerCase()}>
                    <p>{x}</p>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label={"Year"} inputProps={register("year")} />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              disabled={
                isLoading ||
                !Object.entries(selectedVals).find(
                  ([key, value]) => key === "t" && value
                )
              }
              sx={{ marginRight: 1 }}
              onClick={() => {
                reset({ t: "" });
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
