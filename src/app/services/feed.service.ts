import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private api: ApiService) { }

  public getFeed() {
    const url = SETTINGS.API_URL + 'feed/';
    return this.api.get(url);
  }
}
