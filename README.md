# About
![Deploy to GitHub Pages](https://github.com/Kishanjay/adyen-relocator/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

[view result](https://kishanjay.github.io/adyen-relocator/)


## Assignment
Jamie's vacation is about to end. She works at an international company, so she can choose another office to work from: either Amsterdam, Madrid, or Budapest. Help her choose which office to go to – she’d like someplace with good weather or cheap flights (or both).

If you'd like to use an API (it's optional), you could try the AccuWeather API https://developer.accuweather.com 
the Kiwi API https://docs.kiwi.com, or another of your choosing.

You have full control over how you want to present your data, but keep in mind this is a client-side application and Jamie needs to have enough information to make her choice. Make sure to publish your result on GitHub and provide an online demo. You can pick a framework (if you want to use one), and the browser compatibility is up to you. We really value creativity, and we encourage you to create your own requirements while working on this assignment. It would be great if you could finish this within one week. We would advise you to use technologies you are comfortable working with and use approximately 4 hours for this assignment.

### Summary
Jamie works at an international company
Jamie's holiday is comming to an end
Jamie can choose an office among Amsterdam, Madrid or Budapest
Jamie likes 'good weather' and/or 'cheap flights'

### Requirements
For Jamie to make an educated decision to which of these places she wants to go she could use an overview of these places
along with her decision making criteria. Jamie likes good weather and cheap flights. Since this is all information we have
we will make an application that is flexible to Jamies criteria.

Note: due to limitations by the free version of the API's, the weather data cannot go beyond 5 days of forecast.
Also fetching the history weather data is not included in the free API version.

Due to these limitations we will assume that Jamie can make a decision on the weather based on 5 days of forecast.
For flights, Jamie should be able to make her decision based on the cheapest flight prices within the next 2 weeks.

Beyond this, Jamie would also like to know what the city is like, therefore a moodboard will be included that gives
Jamie an impression of the city she will be moving to.

Since Jamie is very ambitious, it may be that she'd want to go to other places as well. Therefore the application
is designed in a way that both the origin as the destination cities are flexible and easy to adjust.

## Implementation
For the implementation of this assignment the following tools have been used
- VueJS
- Vuetify framework (to increase development speed)
- Vue cli scaffolding was used to setup this project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
