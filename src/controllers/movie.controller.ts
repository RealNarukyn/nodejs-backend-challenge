import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { IMovie, IMoviesList } from "src/interfaces/movie";
import { MoviesListModel } from "../models/movie";

import { getUniqueID } from "../utils/utils";

const isValidMovie = (movie: any): boolean => {
  if (!movie) return false;

  if (!movie.title || !movie.director) return false;

  return true;
};

export class MovieController {
  // * Create a new list with a given name (auto-generate the **unique** id)
  static create = async (request: Request, response: Response) => {
    const { name, userID } = request.body;
    if (!name) {
      return response.json({
        statusCode: 502,
        msg: "You need to specify a name for the list...",
      });
    }
    if (!userID) {
      return response.json({
        statusCode: 502,
        msg: "You need to specify an specific userID to the list...",
      });
    }

    const listID: string = getUniqueID();

    const doc: HydratedDocument<IMoviesList> = new MoviesListModel({
      listID,
      name,
      userID,
    });
    await doc.save();

    return response.json({
      statusCode: 200,
      msg: `Movies List ${doc.name} Created Successfully with ID: ${doc.listID}`,
    });
  };

  //## Just returns all the availables lists
  static findAll = async (request: Request, response: Response) => {
    return response.json(await MoviesListModel.find());
  };

  // * Get the users movies lists
  static findAllByUser = async (request: Request, response: Response) => {
    const { userID } = request.params;
    return response.json(
      await MoviesListModel.find({ userID: parseInt(userID) })
    );
  };

  // * Get an individual list for the user
  static findBylistID = async (request: Request, response: Response) => {
    const { userID, listID } = request.params;
    return response.json(
      await MoviesListModel.findOne({
        userID: parseInt(userID),
        listID: listID,
      })
    );
  };

  // * Add films to a given list (based on the generated id)
  static add = async (request: Request, response: Response) => {
    const { listID, movies } = request.body;
    if (!listID) {
      return response.json({
        statusCode: 502,
        msg: "You need to specify an specific listID to add the movies...",
      });
    }

    const moviesList: HydratedDocument<IMoviesList> =
      await MoviesListModel.findOne({ listID });
    if (!moviesList) {
      return response.json({
        statusCode: 404,
        msg: `Movies List not found with ID: ${listID}`,
      });
    }

    for (let i = 0; i < movies.length; i++) {
      if (!isValidMovie(movies[i])) {
        console.log(
          movies[i],
          "==> not added to the movies list because it's not in a proper format"
        );
        continue;
      }

      const movie: IMovie = movies[i];
      moviesList.movies.push(movie);
    }

    await moviesList.save();
    return response.json({ statusCode: 200, msg: "Movies field updated" });
  };

  static delete = async (request: Request, response: Response) => {
    const { userID, listID } = request.params;
    const { title, director } = request.body;

    if (!title && !director) {
      return response.json({
        statusCode: 403,
        msg: "What are you trying to delete??",
      });
    }

    const moviesList: HydratedDocument<IMoviesList> =
      await MoviesListModel.findOne({
        userID: parseInt(userID),
        listID: listID,
      });

    if (!moviesList) {
      return response.json({
        statusCode: 404,
        msg: `Couldn't find the movies list with the ID: ${listID}`,
      });
    }

    let filteredMovies: Array<IMovie>;
    //## Delete all coincidences with the "title" and "director"
    if (title && director) {
      //## No fui capaz de filtrar exactamente por titulo y director...
      //## Borra todas las coincidencias que encuentre tanto con titulo como autor
      //## no solo las que coincidan exactamente las dos
      filteredMovies = moviesList.movies.filter(
        (e) => e.title !== title && e.director !== director
      );
    } else if (title && !director) {
      //## Delete all coincidences with the "title"
      filteredMovies = moviesList.movies.filter((e) => e.title !== title);
    } else if (!title && director) {
      //## Delete all coincidences with the "director"
      filteredMovies = moviesList.movies.filter((e) => e.director !== director);
    }

    //## This means there's no delete so there's no coincidences
    if (filteredMovies.length === moviesList.movies.length) {
      return response.json({
        statusCode: 403,
        msg: `We couldn't find any movie with the data you specified in the ${moviesList.name} Movies List`,
      });
    }

    //## Change the array
    moviesList.movies = filteredMovies;

    await moviesList.save();

    return response.json({
      statusCode: 200,
      msg: `Movies deleted with the data you specified in the ${moviesList.name} Movies List`,
    });
  };
}
