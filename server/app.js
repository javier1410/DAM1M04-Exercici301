const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = 3000;

// Contenido estático
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrar parciales
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Helper obligatorio
hbs.registerHelper('lte', (a, b) => a <= b);

// Cargar JSON
const site = require('./data/site.json');
const citiesData = require('./data/cities.json');
const countriesData = require('./data/countries.json');

// Ruta /
app.get('/', (req, res) => {
  res.render('index', site);
});

// Ruta /informe
app.get('/informe', (req, res) => {
  res.render('informe', {
    title: site.title,
    subtitle: site.subtitle,
    cities: citiesData.cities,
    countries: countriesData.countries,
    limit: 800000
  });
});

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/informe`);
});