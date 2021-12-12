export interface IMovie {
  title: string;
  director: string;
}

export interface IMoviesList {
  listID: string;
  name: string;
  movies: Array<IMovie>;
  userID: number;
}
