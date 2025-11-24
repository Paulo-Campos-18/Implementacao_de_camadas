import{PostgresRepo} from "./AppointmentRepo/AppointmentRepoPostgres"
import{CompromissoService} from"./SchedulerService/CompromissoService";
import {Cli} from "./Adapters/Cli";
const  repo = new PostgresRepo()
const service = new CompromissoService(repo)
const cli = new Cli(service)
cli.Run()
