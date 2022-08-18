

//Controllers
import { PokemonController } from "./controllers/pokemon.controller";

//Services
import { PokemonService } from "./services/pokemon.service";

export const setControllers = (app:any) => {
    
    const pokemonController = new PokemonController(new PokemonService());

    // Telling express to use our Controller's routes
    app.use("/pokemon", pokemonController.router);
}