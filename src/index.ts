import express, { Request, Response } from 'express';
const { PORT } = require('../src/application/config/config');


const app = express();

import CreateGamePlayersUseCase from './module/use_case/create_game_player.use_case';
import StartGameUseCase from './module/use_case/start_game.use_case';
import EndGameUseCase from './module/use_case/end_game.use_case';
import GetListPrevGamesUseCase from './module/use_case/get_list_prev_games.use_case';
import GetRoundsPrevGameUseCase from './module/use_case/get_rounds_prev_game.data_source';
import GetGameDetailsUseCase from './module/use_case/get_game_details.use_case';
import MongoDbClient from './mongodb/database_connection.monggodb';
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
MongoDbClient.connect();
MongoDbClient.db("admin").command({ ping: 1 });

app.post('/game', (req: Request, res: Response) => {
    return CreateGamePlayersUseCase({ req, res })
});


app.post('/game/:id', (req: Request, res: Response) => {
    return StartGameUseCase({ req, res })
});

app.post('/game/:id/end', (req: Request, res: Response) => {
    return EndGameUseCase({ req, res })
});

app.get('/game', (req: Request, res: Response) => {
    return GetListPrevGamesUseCase({ req, res })
});

app.get('/game/rounds/:id', (req: Request, res: Response) => {
    return GetRoundsPrevGameUseCase({ req, res })

});

app.get('/game/:id', (req: Request, res: Response) => {
    return GetGameDetailsUseCase({ req, res })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
