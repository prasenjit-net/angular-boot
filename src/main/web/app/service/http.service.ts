import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Request, Response, Headers} from "@angular/http";

import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService {
  public token: string;

  constructor(private _http: Http) {
  }

  /**
   * Performs any type of http request. First argument is required, and can either be a url or
   * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
   * object can be provided as the 2nd argument. The options object will be merged with the values
   * of {@link BaseRequestOptions} before performing the request.
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.request(url, options);
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.post(url, body, options);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.put(url, body, options);
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.delete(url, options);
  }

  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.patch(url, body, options);
  }

  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.head(url, options);
  }

  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.handleRequest(options);
    return this._http.options(url, options);
  }

  private handleRequest(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (this.token) {
      options = options ? options : {};
      let header: Headers = options.headers ? options.headers : new Headers();
      header.set('Authorization', this.token);
      options.headers = header;
    }
    return options;
  }
}
