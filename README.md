Scenario:
=========

A developer of ours was recently integrating into Google Places API when Dogecoin mooned.
They committed this repo with a partial integration and some testcases before jumping into their new lambo and driving off into the sunset.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.

Task:
=====
To take a partial address input and return full address suggestions along with the address broken into its individual components using the Google Maps API.


Resources:
==========

Autocomplete Documentation: https://developers.google.com/maps/documentation/places/web-service/autocomplete
Place Documentation: https://developers.google.com/maps/documentation/places/web-service/details
API Key: AIzaSyAl47RX-oVJT7QssjxxJY4g-HI45q1I10w

Install:
========
1. yarn install

Test:
=====
1. yarn install
2. yarn test


Requirements:
=============

1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The main library function should return a native Promise which resolves to an array of results
5. The result element should contain both the completed suggestion and also the suggestion broken down into its components (unit, street number, street name, suburb, state, postcode, country)
6. The returned result should be typed and easily consumable via users of the library
7. No front-end requirements are necessary, this is purely a backend NodeJS library
