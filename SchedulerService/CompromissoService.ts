import type { IDataService } from "../Interfaces/DataServices";
import { IAppointmentRepo } from "../Interfaces/IAppointmentRepo";
import { format } from "date-fns";
import { IObjFromBd } from "../Interfaces/IObjFromBd"



export class CompromissoService implements IDataService {

    constructor(private repo: IAppointmentRepo) {
    }

    Listar(): Promise<IObjFromBd[]> {
        //Camada adicionada para caso no futuro se possa adincionar alguma lógica de negócio 
        const resultado = this.repo.Listar();
        return resultado;
    }
    async VerificarDuplicata(desc: string, inicio: Date, fim: Date): Promise<boolean> {
        const lista = await this.Listar();

        for (let i = 0; i < lista.length; i++) {

            const linha = lista[i];
            if (linha) {
                const inicioDb = new Date(linha.inicio);
                const fimDb = new Date(linha.fim);

                if (format(inicioDb, "dd/MM/yyyy") === format(inicio, "dd/MM/yyyy")) {

                    if (inicio < fimDb && fim > inicioDb) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
    async Adicionar(desc: string, inicio: Date, fim: Date): Promise<string> {
        if (!await this.VerificarDuplicata(desc, inicio, fim)) {
            return this.repo.Adicionar(desc, inicio, fim)
        } else {
            return "Falha na inserção, compromissos em conflito."
        }
    }

}