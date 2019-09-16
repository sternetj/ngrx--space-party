import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpUserEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { getAllFood, addFood, updateFood, getFood, deleteFood } from "../../../../server/food";
import { getAllGames, getGame, createGame } from "../../../../server/games";
import { getAllSongs, addSong, searchSongs } from "../../../../server/songs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let body = undefined;
    console.log(req.url)
    if (req.url.indexOf("food") > -1) {
      body = foodApi(req);
    } else if (req.url.indexOf("games") > -1) {
      body = gamesApi(req);
    } else if (req.url.indexOf("songs") > -1) {
      body = songsApi(req);
    }

    if (body) {
      return Observable.of(new HttpResponse({ body }));
    }

    return Observable.of(new HttpErrorResponse({ status: 404 }) as any);
  }
}

const foodApi = (req: HttpRequest<any>) => {
  const id = req.url.split("food")[1];

  if (id === "") {
    switch (req.method) {
      case "GET":
        return getAllFood();
      case "POST":
        return addFood(req);
      case "PUT":
        return updateFood(req);
    }
  } else {
    switch (req.method) {
      case "GET":
        return getFood(id);
      case "DELETE":
        return deleteFood(id);
    }
  }
}

const gamesApi = (req: HttpRequest<any>) => {
  const id = req.url.split("games")[1];

  if (id === "") {
    switch (req.method) {
      case "GET":
        return getAllGames();
      case "POST":
        return createGame(req);
    }
  } else {
    switch (req.method) {
      case "GET":
        return getGame(id);
    }
  }
}

const songsApi = (req: HttpRequest<any>) => {
  const id = req.url.split("songs")[1];

  if (id === "") {
    switch (req.method) {
      case "GET":
        return getAllSongs();
      case "POST":
        return addSong(req);
    }
  } else {
    switch (req.method) {
      case "GET":
        return searchSongs(req);
    }
  }
}
