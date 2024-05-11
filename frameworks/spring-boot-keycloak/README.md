# SpringBoot Keycloak SPA application

This project was generated with [Spring Initializr](https://start.spring.io/).

# Quick Start

1. Start Keycloak server using `docker-compose up -d`
2. Go to `http://localhost:8888/auth` and login using username `admin` and password `admin`
3. Create a realm `demo-realm`
4. Create a public client `demo-spa` and add redirectUri `http://localhost:4200/*` and Web Origins `http://localhost:4200`
5. Create a realm role `user`
6. Create a `test` user and assign the `user` role to it. Add password credentials to the `test` user.
7. Run `./gradlew bootRun` to start the SpringBoot application in s terminal
8. Open another terminal. Go to `./angularclient` folder. Start the Angular app using `npm run ng serve`
9. Open in a browser `http://localhost:4200/`. After login with the user created at step 7 the accessToken should be present in the localstorage of the browser
10. Use access token to access secured endpoints:
```
curl --location 'http://localhost:8080/api/test/anonymous' \
    --header 'Authorization: Bearer {{$access_token}}'
````
```
curl --location 'http://localhost:8080/api/test/user' \
    --header 'Authorization: Bearer {{$access_token}}'
````