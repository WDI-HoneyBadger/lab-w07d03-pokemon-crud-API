# Pokemon CRUD API

For this lab we will be converting our favorite full stack CRUD app, WikiPokePedia, into a CRUD API!  This means no longer with WikiPokePedia offer an html interface to interact with the database.  Instead we're turning it into a server that sends and receives JSON data.  This will let developers use our API for whatever they want!  Let's get started.

## Provided
As starter code you have some of the stuff we have already done in WikiPokePedia.  You have the same seed and index.js.  The models have been updated and are also good to go.  You also have the `config.js` file for your db, don't forget to update this with your username.

For this lab you should not have to do any work in your model, but you will have to look at your model to make sure you know what the names are of the `res.locals` variables.

## What's Changed
Because we are developing an API there are a few things that have been changed:
1.  All the views have been removed; we don't need this for an API!
2.  The routes and controllers have been removed.  These need to be updated. With an API we don't need all those "render___" functions, we don't need routes like the `GET` routes for the "edit" or "new" forms.

    <details>
    <summary><strong>Why don't we need GET routes for the edit or new forms?</strong></summary>

    In a regular full stack application the GET routes are used to render the forms to edit an entry or add a new entry.  With an API the users don't need the forms, they will be interacting with our server using Postman or AJAX.  Therefore they don't need routes to render the forms, they only need the PUT and POST routes where they can send AJAX calls to.

    </details>

## Assignment

1. Look at the code that has been provided.  Take a look at the Pokemon model and refresh yourself with the methods we have there.  All these methods are still good and useable, you do not need to make any updates here.
2. *Go to our controller and add routes for our CRUD functionality.*. Go through each step below in order.  Think about which model methods will be needed in each route!
     a.  `GET /pokemon` - returns all the pokemon in the database. Test this route in Postman.
     b.  `GET /pokemon/:id` - returns a single pokemon from the database.  Test this route in Postman.
     c.  `POST /pokemon` - adds a new pokemon to the database. Test this route by doing a POST request in Postman with a made up Pokemon.  Test this by doing a GET request to `/pokemon` and scroll to the bottom to see if the new Pokemon is there.
     d.  `DELETE /pokemon/:id` - removes a pokemon from the database. Test this by doing a DELETE request in Postman to remove pokemon with id of 53 from the database (Psyduck).  Now do a GET request to `/pokemon` to make sure it worked.  You should see no Pokemon 53!
     d.  `PUT /pokemon/:id` - edits an existing pokemon in the database.  Test this by doing a PUT request in Postman to edit pokemone with id of 25 from the database (Pikachu).  In your request change Pikachu's name to "Peekuhchoo".  After you updated the name do a GET request to `/pokemon/25` to make sure it worked.


## Check For Understanding:

For our express apps the `create` and `update` methods in our models had `RETURNING id;` at the end of the SQL queries. For our API we have `RETURNING *;` at the end of the SQL queries.  Why is it different?  Discuss with your neighbors and make sure everyone understands.
  