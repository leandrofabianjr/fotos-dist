declare class Foto {
    id: any;
    tamanho: any;
    url: any;
    name: any;
    constructor(json: any);
    toJson(): {
        tamanho: any;
        url: any;
    };
}
export declare class AppService {
    buscarFotos(offset?: number, maximo?: number): Promise<{
        fotos: Foto[];
        total: number;
    }>;
}
export {};
