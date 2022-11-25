import { addHours, startOfDay } from 'date-fns';

import { Procedimento } from './procedimento';
import { Cliente } from './cliente';

export class Agendamento {
    id?:number;
    dataInicio:Date = addHours(startOfDay(new Date()), 8);
    dataFim:Date = addHours(startOfDay(new Date()), 9);
    confirmado:boolean = false;
    pago:boolean = false;;
    valor?:number;
    custoMaterial?:number;
    custoFixo?:number;
    clienteId?:number;
    cliente?: Cliente;
    procedimentoId?:number
    procedimento?: Procedimento;
}