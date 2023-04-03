export default interface ITitleLookupProps {
  t: string;
  type?: "movie" | "series" | "episode" | "game";
  year?: number;
}
