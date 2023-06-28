import { createContainer, asClass, Lifetime } from "awilix";
import CompetitionRepository from "./src/data/repository/CompetitionRepository.js";
import TeamRepository from "./src/data/repository/TeamRepository.js";


const container = createContainer();

container.register('CompetitionRepository',asClass(CompetitionRepository),{lifetime: Lifetime.SINGLETON});
container.register('TeamRepository',asClass(TeamRepository),{lifetime: Lifetime.SINGLETON});
export default container;