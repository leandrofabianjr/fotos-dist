"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const google = require("googleapis");
class Foto {
    constructor(json) {
        this.id = json.id;
        this.tamanho = json.size;
        this.url = `https://drive.google.com/thumbnail?id=${this.id}&sz=w1000`;
        this.name = json.name;
    }
    toJson() {
        return {
            tamanho: this.tamanho,
            url: this.url,
        };
    }
}
let AppService = class AppService {
    async buscarFotos(offset = 0, maximo = 10) {
        const folderId = process.env.FOTOS_PASTA_GOOGLE_ID ?? '';
        const base64EncodedServiceAccount = process.env.GOOGLE_CREDENTIALS_BASE64;
        const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8');
        const credentials = JSON.parse(decodedServiceAccount);
        const auth = new google.Auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
        });
        const drive = new google.drive_v3.Drive({ auth });
        return new Promise((resolve, reject) => {
            drive.files.list({
                q: `'${folderId}' in parents and trashed = false`,
                fields: 'nextPageToken, files(id, size, name)',
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const total = result.data.files.length;
                    const fotos = result.data.files
                        .map((file) => new Foto(file))
                        .slice(offset, offset + maximo);
                    resolve({ fotos, total });
                }
            });
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map