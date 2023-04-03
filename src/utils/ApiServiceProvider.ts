import axios from "axios";
export default abstract class ApiServiceProvider {
  private static _httpClient = axios.create();
}
