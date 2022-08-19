# Steps to run the application:

First step is to add the environment variables into the project.
This is normally something I wouldn't do, I would have to create a Vault in Onepassword send you an invite but since its just a demo application I feel comfortable skipping those steps and adding the information here:

Create a .env file in the root folder of the project and paste this

Sidenote: I added mongo installation in the docker compose just to demonstrate how to do it but I actually have an instance of mongo running in digitalocean that I used for this demo seemed easier.

PORT=9001
MONGO_URL="mongodb+srv://doadmin:7B83yXEC54e29q0M@pokemon-93a4d7ab.mongo.ondigitalocean.com/admin"

## Install the dependencies

### `npm install once you have selected the root folder in your IDE`

### Run the application

Execute `docker-compose up --build` in the terminal and you're all setup to test the the API with the React application hope you like it.

If you prefer to run it without docker from the root folder in the terminal you can also execute `npm start`
