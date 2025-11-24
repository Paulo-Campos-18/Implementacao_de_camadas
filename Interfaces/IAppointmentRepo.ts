import{IObjFromBd} from"./IObjFromBd"

export interface IAppointmentRepo{
    
    Listar():Promise<IObjFromBd[]>;
    Adicionar(descrição:string,inicio:Date,fim:Date):Promise<string>;
}

