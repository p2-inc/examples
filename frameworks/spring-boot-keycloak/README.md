# SpringBoot Keycloak SPA application

This project was generated with [Spring Initializr](https://start.spring.io/).

Follow along with the [tutorial](https://phasetwo.io/blog/secure-spring-boot/) from Phase Two.

# Get Started

## Start Keycloak Server

To skip this section, use [Phase Two](https://phasetwo.io/dashboard/) to setup a free Keycloak hosted in the cloud. Instructions below assume using the local instance, but values can easily be changed to match the cloud instance.

1. Start Keycloak server using `docker-compose up -d`
1. Go to `http://localhost:8888/auth` and login using username `admin` and password `admin`
1. Create a realm `demo-realm`
1. Create a public client `demo-spa` and add redirectUri `http://localhost:4200/*` and Web Origins `http://localhost:4200`
1. Create a realm role `user`
1. Create a `test` user and assign the `user` role to it. Add password credentials to the `test` user.

## Start Angular Application

1. Open another terminal. Go to `./angularclient` folder. Run `npm i` and start the Angular app using `npm run start`.
1. Open the browser to `http://localhost:4200/`. After login the `accessToken` should be present in the `localStorage` of the browser. View this by opening a Web console and typing `localStorage` to view its value.
1. Use access token to access secured endpoints:

## Start Spring Application

1. Run `./gradlew bootRun` to start the SpringBoot application in a terminal.
1. Directly hit the Spring application's API interface. Pull the `accessToken` from `localStorage`.

```
curl --location 'http://localhost:8080/api/test/anonymous' \
    --header 'Authorization: Bearer {{$access_token}}'
```

```
curl --location 'http://localhost:8080/api/test/user' \
    --header 'Authorization: Bearer {{$access_token}}'
```
