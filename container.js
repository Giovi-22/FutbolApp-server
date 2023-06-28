import { createContainer, asClass, Lifetime } from "awilix";
import CompetitionRepository from "./src/data/repository/CompetitionRepository.js";


const container = createContainer();

container.register('CompetitionRepository',asClass(CompetitionRepository),{lifetime: Lifetime.SINGLETON});

export default container;