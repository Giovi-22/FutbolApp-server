import { createContainer, asClass, Lifetime } from "awilix";

import CompetitionRepository from "./data/repository/CompetitionRepository";
import TeamRepository from "./data/repository/TeamRepository";
import UserMongooseRepository from "./data/repository/UserMongooseRepository";



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
