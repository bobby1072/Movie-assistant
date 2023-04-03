import axios from "axios";
import Constants from "../common/Constants";
import ITitleLookupProps from "../common/TitleLookupOptions";
import IMovie from "../common/TitleLookupResponse";
export default abstract class ApiServiceProvider {
  private static _httpClient = axios.create({
    baseURL: `http://www.omdbapi.com/?apiKey=${Constants.ApiKey}/`,
  });
  private static _urlEncode(options: ITitleLookupProps) {
    return Object.entries(options).reduce((acc, [key, value], index) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value.toString());
      const separator = index === 0 ? "" : "&";
      return `${acc}${separator}${encodedKey}=${encodedValue}`;
    }, "");
  }
  private static async _getRequest<
    TParam extends ITitleLookupProps,
    TReturn extends IMovie
  >(options: TParam): Promise<TReturn> {
    const request = await this._httpClient.get<TReturn>(
      `${this._urlEncode(options)}`
    );
    return request.data;
  }
  public static TitleLookup(options: ITitleLookupProps): Promise<IMovie> {
    return this._getRequest<ITitleLookupProps, IMovie>(options);
  }
}
