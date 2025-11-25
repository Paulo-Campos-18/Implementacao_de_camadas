import {db} from "../BD/postgres_compromissos"
import{IAppointmentRepo} from "../Interfaces/IAppointmentRepo"
import{IObjFromBd} from"../Interfaces/IObjFromBd"

export class PostgresRepo implements IAppointmentRepo{
    async Listar(): Promise<IObjFromBd[]> {
        const result =  await db.query('SELECT * FROM compromissos')
        return result.rows;
       
    }
    async Adicionar(desc:string,inicio:Date,fim:Date): Promise<string> {
        await db.query(
            'INSERT INTO compromissos (inicio,fim,descricao)Values ($1,$2,$3)',
            [inicio,fim,desc]    
        ) 
        return "Sucesso na inserção" 
    }    
}
