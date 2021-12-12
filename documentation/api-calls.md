# API Calls === Request Examples

## [ General API Information ]

You can test these routes using _Postman_ or any other tool that let's you do **GET-POST-PUT-DELETE** operations.

Every endpoint follows the structure: _https:localhost:3000_ + _/api_ + _/object-related_ + _action_if_needed_

There're 4 types of possible _API Response_:

- API Response 1:

  ```JSON
  { "statusCode": "number", "msg": "string" }
  ```

- API Response 2:

  ```JSON
  { "statusCode": "number", "data": "Object" }
  ```

- API Response 3:

  ```JSON
  [ {"Object": "1"}, {"Object": "2"} ]
  ```

- API Response 4:

  ```JSON
  {"Object": "1"}
  ```

The 2 endpoints we get in the projects are:

- Auth endpoints: _https:localhost:3000/api/auth/_
- Auth endpoints: _https:localhost:3000/api/movieslist/_

## [ Auth Routes ]

- method: _POST_ === Endpoint: _https:localhost:3000/api/auth/login_

  Request Example:

  ```JSON
  {
      "username": "string",
      "password": "string"
  }
  ```

  Returns the API Response **type 2** being data the user info _(perhaps it should be the token with JWT)_

- method: _POST_ === Endpoint: _https:localhost:3000/api/auth/register_

  Request Example:

  ```JSON
  {
      "username": "string",
      "password": "string"
  }
  ```

  Returns the API Response **type 2** being data the NEW user info _(perhaps it should be the token with JWT)_

## [ Movieslist Routes ]

- method: _GET_ === Endpoint: _https:localhost:3000/api/movieslist_

  Returns the API Response **type 3** being the array all the movies lists availables.

- method: _GET_ === Endpoint: _https:localhost:3000/api/movieslist/:userID_

  Returns the API Response **type 3** being the array all the movies lists availables for the _userID_ specified.

- method: _GET_ === Endpoint: _https:localhost:3000/api/movieslist/:userID/:listID_

  Returns the API Response **type 4** being the object the specific list (listID) of an specific user (userID)

- method: _POST_ === Endpoint: _https:localhost:3000/api/movieslist_

  Request Example:

  ```JSON
  {
      "name": "movies list name",
      "userID": "number"
  }
  ```

  Returns the API Response **type 1** letting the user know if there was an error or everything went right.

- method: _PUT_ === Endpoint: _https:localhost:3000/api/movieslist_

  Request Example:

  ```JSON
  {
      "listID": "817g463",
      "movies": [
          { "title": "test-3", "director": "dir-3" },
          { "title": "test-4", "director": "dir-3" },
          { "title": "test-5", "director": "dir-2" },
          { "title": "test-6", "director": "dir-2" },
          { "title": "test-7", "director": "dir-4" },
          { "name": "test-8", "director": "dir-5" }
      ]
  }
  ```

  Specify the listID you want to add the movies to and pass an array of movies. If there's an object in the movies list that is not a movie `{ title: string, director: string }` it won't be added.

  Returns the API Response **type 1**.

- method: _DELETE_ === Endpoint: _https:localhost:3000/api/movieslist_

  Request Example:

  ```JSON
  {
    "title"?: "test-3",
    "director"?: "dir-3"
  }
  ```

  Both parameters are optional. You can specify on what you want to focus to take out a movie from the list. Whether it's going to be the title, the director or both (I couldn't not make work both specification, if you use title and director it deletes every match of both cases not only the specific where both coincide).

  Returns the API Response **type 1**.
