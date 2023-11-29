# Network

A project that allows users to make small blog posts, follow other users, and like posts by other users and themselves.

See it live: [network.catbirdseat.io](https://network.catbirdseat.io)
Video Demo: [YouTube](https://youtu.be/-sOrSYxr9Rk)

## Python

The backend API, login, registration, and home pages are served by the [Django Framework](https://www.djangoproject.com/) and [Django Rest Framework](https://www.django-rest-framework.org/). The javascript frontend is sent with the static files.

## Javascript

This project's javascript is bundled using the Webpack 5 module bundler. The user interface was built with the [React Library](https://react.dev/). Individual pages were built with components and displayed onto the screen.

## Installation
Be sure to have Python 3.11 an Node 20+ installed.

Create a virtual environment and install requirements:
`python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`

Run the bundler in the root directory:
`npm install
npm run dev
`
or for a production build:
`npm install
npm run build
`


## .env

This project uses [django-environ](https://django-environ.readthedocs.io/en/latest/), which allows the use of environment variables to set settings. The following settings are expected to be in environment variables or in an .env file:

| Setting       |                                             Description                                              |
| :------------ | :--------------------------------------------------------------------------------------------------: |
| DEBUG         |                     Determines whether the running application is in debug mode.                     |
| SECRET_KEY    |                                 Secret key used for the application.                                 |
| ALLOWED_HOSTS |                           IPs and domains allowed to acces the application                           |
| DATABASE_URL  | The URL used to access the application's database. To use SQLite locally, use `sqlite:///db.sqlite3` |

## Github Actions

These secrets are used to deploy the application on a Linux VPS:

| Name         | Stage | Description                                         |
| ------------ | ----- | --------------------------------------------------- |
| DATABASE_URL | build | The url of the database in the build stage.         |
| SECRET_KEY   | build | The secret key for the app used in the build stage. |
|SERVER_IP|deploy| The IP address of the server.|
SERVER_USERNAME|deploy| The name of the user that can run sudo commands on the server.|
|SSH_KEY|deploy|Private key used to access server.|
|SUDO_PASSWORD|deploy|The password of the SERVER_USERNAME user.|
|TARGET_DIRECTORY|deploy|The directory where the application lives.|

These variables are used:

| Name         | Stage | Description                                         |
| ------------ | ----- | --------------------------------------------------- |
|ALLOWED_HOSTS|build|The domains allowed to access the app in the build stage. Usually set to `127.0.0.1,localhost`.
| PORT | deploy | The SSH port used to access the server. Hardcoded to port 22.|