import {IAppointmentRepo} from "../Interfaces/IAppointmentRepo"
import{IObjFromBd} from"../Interfaces/IObjFromBd"
export interface IDataService{
    VerificarDuplicata(desc:string,inicio:Date,fim:Date):Promise<boolean>;
    Listar():Promise<IObjFromBd[]>;
    Adicionar(desc:string,inicio:Date,fim:Date):Promise<string>;
}