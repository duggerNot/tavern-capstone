"use strict";

TavernApp.factory("authFactory", (firebaseAuthURL) => {
  let ref = new Firebase(firebaseAuthURL);

  return {
    // Determine if authenticated

    isAuthenticated () {
      let authData = ref.getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },
    // Authenticate

    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            console.log("authWithPassword method completed successfully");
            resolve(authData);
          }
        });
      });
    }
  };
});
