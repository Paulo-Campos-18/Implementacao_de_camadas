
import type { IDataService } from "../Interfaces/DataServices";
import { parse , format} from "date-fns";
import { fromZonedTime,toZonedTime } from "date-fns-tz";


export class Cli {
    //Pega os comandos do terminal e corta os 2 primeiros (caminho do arquivo)

    args = process.argv.slice(2);
    comando = this.args[0];
    desc = this.args[1];
    data = this.args[2];
    inicio = this.args[3];
    fim = this.args[4];

    constructor(private service: IDataService) { }

    async Run() {
        let mensagemDuvida = "Em caso de dúvida tente 'npx ts-code main.ts help' para ver exemplos"

        if (!this.args[0]) {
            console.log("É preciso utilizar um comando um comando")
            console.log(mensagemDuvida)

        }
        else if (this.args[5]){
            console.log("O máximo de argumentos aceitos são 5 (caso use o comando add)")
            console.log(mensagemDuvida)
        }
        else if (this.comando == "add" && this.desc && this.inicio && this.fim && this.data) {
            //Uni as string pois antes estava pegando dois datetime separadamente, obrigando o user a escrever a data duas vezes
            //Após perceber meu erro passei a pedir a data uma vez e então unir com a hora para  guardar no bd em um timespan
            const inicio_utc = fromZonedTime(parse(this.data + " " + this.inicio, "dd/MM/yyyy HH:mm", new Date()), "America/Sao_Paulo");
            const fim_utc = fromZonedTime(parse(this.data + " " + this.fim, "dd/MM/yyyy HH:mm", new Date()), "America/Sao_Paulo");

            let result = await this.service.Adicionar(this.desc, inicio_utc, fim_utc);
            console.log(result);
        }
        else if (this.comando == "list" && !this.args[1]) {
            const resultado = await this.service.Listar();
            if(resultado.length === 0 ){
                console.log("Nenhum compromisso encontrado.")
            }else{

                console.log("----------------------------------------------")
                for (let i = 0; i < resultado.length; i++) {
                    const item = resultado[i]
                    //Esse if faz com que o ts pare de reclamar que o item pode ser undefined 
                    if(!item)continue 
                    
                    console.log(
                        "Descrição: " + item.descricao + "\n" + 
                        "Data: " + format(toZonedTime(item.inicio,"America/Sao_Paulo"), "dd/MM/yyyy") + "\n" +
                        "Hora inicio: " + format(toZonedTime(item.inicio,"America/Sao_Paulo"),"HH:mm") + "\n"+
                        "Hora fim: " + format(toZonedTime(item.fim,"America/Sao_Paulo"),"HH:mm") + "\n"+
                        "----------------------------------------------"   
                    )
                }
            }

        } else if (this.comando == "help" && !this.args[1]) {
            console.log("Para adicionar um compromisso: npx ts-node main.ts add 'descrição' 'data' 'hora_inicio' 'hora_fim' (data no formato -> dd/mm/yyyy e inicio e fim ->  hh:mm) ")
            console.log("Para listar os  compromissos: npx ts-node main.ts list.\n ")
            console.log("A descrição, data, hora_inicio e hora_fim devem estar dentro de aspas simples ou duplas. ")
            console.log("Exemplo: 'Reunião' '24/11/2025' '15:35' '17:00'\n")

        } else {
            console.log("Comando ou parâmetros estão incorretos !")
            console.log(mensagemDuvida)
        }
    }
}