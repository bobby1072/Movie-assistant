import axios, { AxiosInstance } from "axios";
import Constants from "../common/Constants";
import IMovie from "../common/TitleLookupResponse";
import ILookupProps from "../common/TitleLookupOptions";
export default abstract class ApiServiceProvider {
  private static _httpClient: AxiosInstance = axios.create({
    baseURL: `http://www.omdbapi.com`,
  });
  private static _urlEncode(options: ILookupProps): string {
    return Object.entries(options).reduce((acc, [key, value], index) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value.toString());
      const separator = index === 0 ? "" : "&";
      if (encodedKey && encodedValue) {
        return `${acc}${separator}${encodedKey}=${encodedValue}`;
      } else {
        return acc;
      }
    }, "");
  }
  private static async _getRequest<
    TParam extends ILookupProps,
    TReturn extends IMovie
  >(options: TParam): Promise<TReturn> {
    const request = await this._httpClient.get(
      `?apiKey=${Constants.ApiKey}&${this._urlEncode(options)}`
    );
    if (request.data.Response === "False") throw new Error(Constants.BadSearch);
    return request.data as TReturn;
  }
  public static TitleLookup(options: ILookupProps): Promise<IMovie> {
    return this._getRequest<ILookupProps, IMovie>(options);
  }
}
