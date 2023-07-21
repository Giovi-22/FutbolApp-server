import { createContainer, asClass, Lifetime } from "awilix";
import CompetitionRepository from "./data/repository/CompetitionRepository.js";
import TeamRepository from "./data/repository/TeamRepository.js";
import UserMongooseRepository from "./data/repository/UserMongooseRepository.js";


const container = createContainer();

container.register({
    competitionRepository: asClass(CompetitionRepository,{lifetime:Lifetime.SINGLETON})
});

container.register({
    teamRepository: asClass(TeamRepository,{lifetime:Lifetime.SINGLETON})
});

container.register({
    userRepository: asClass(UserMongooseRepository,{lifetime:Lifetime.SINGLETON})
})
export default container;
