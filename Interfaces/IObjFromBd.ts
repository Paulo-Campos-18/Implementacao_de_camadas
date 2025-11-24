//Os nomes da propriedade tem de ser o mesmo do nome da tabela, se não devolve undefined 
export interface IObjFromBd{
    id: number;
    inicio: Date;
    fim: Date; 
    descricao:string;
}