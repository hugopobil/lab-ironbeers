const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
    console.log('Beers from the database: ', beersFromApi)
    res.render("beers.hbs", {beers: beersFromApi})
  })
  .catch(error => console.log(error));
})

app.get("/random-beer", (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log("Random Beer Response:")
    console.log(responseFromAPI)
    res.render("random-beer.hbs", {beer : responseFromAPI})
  })
  .catch(error => console.log(error));

})

app.listen(4000, () => console.log('🏃‍on port 4000'));