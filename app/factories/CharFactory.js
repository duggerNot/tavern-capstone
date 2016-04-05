"use strict";

TavernApp.factory("charFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://tavernapp.firebaseio.com/characters.json")
        .success(
          characterList => resolve(characterList),
          error => reject(error)
        )
    )
);
