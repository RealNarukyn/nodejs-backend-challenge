import { Schema, model } from "mongoose";

import { IMoviesList } from "../interfaces/movie";

const MoviesListSchema = new Schema<IMoviesList>({
  listID: { type: String, required: true },
  name: { type: String, required: true },
  movies: { type: [Object], default: [] },
  userID: { type: Number, required: true },
});

export const MoviesListModel = model<IMoviesList>(
  "MoviesList",
  MoviesListSchema
);
