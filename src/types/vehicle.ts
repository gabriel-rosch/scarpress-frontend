export interface VehicleProps {
    id: string;
    plate: string;
    description: string;
    chassis: string;
    model: string;
    year: string;
    renavan: string;
    brand: string; //Marca/fabricante
    weight: string;
    tracked: boolean; //rastreado
    horse: boolean; //cavalo
    owner: string; //proprietario
    axes: string;
    articulateds:[];
     
  }
