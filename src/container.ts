import { createContainer, asClass, Lifetime } from "awilix";
import CompetitionRepository from "./data/repository/CompetitionRepository.js";
import TeamRepository from "./data/repository/TeamRepository.js";


const container = createContainer();

container.register({
    competitionRepository: asClass(CompetitionRepository,{lifetime:Lifetime.SINGLETON})
});
container.register({
    teamRepository: asClass(TeamRepository,{lifetime:Lifetime.SINGLETON})
});

export default container;
