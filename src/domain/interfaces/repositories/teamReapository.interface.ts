import TeamEntity from "../../entities/Team";

export interface TeamRepository{
    create(team:TeamEntity):Promise<TeamEntity>
}