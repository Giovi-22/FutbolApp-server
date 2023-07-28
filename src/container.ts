import { createContainer, asClass, Lifetime } from "awilix";

import CompetitionRepository from "./data/repository/CompetitionRepository";
import UserMongooseRepository from "./data/repository/UserMongooseRepository";
import TeamMongooseRepository from "./data/repository/TeamRepository";



const container = createContainer();

container.register({
    competitionRepository: asClass(CompetitionRepository,{lifetime:Lifetime.SINGLETON})
});

container.register({
    teamRepository: asClass(TeamMongooseRepository,{lifetime:Lifetime.SINGLETON})
});

container.register({
    userRepository: asClass(UserMongooseRepository,{lifetime:Lifetime.SINGLETON})
})

export default container;
