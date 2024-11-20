import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<{
        hero: {
            id: any;
            tamanho: any;
            url: any;
            name: any;
            toJson(): {
                tamanho: any;
                url: any;
            };
        };
        colunas: any[];
        total: number;
    }>;
}
