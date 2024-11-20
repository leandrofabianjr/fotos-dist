"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exphbs = require("express-handlebars");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.engine('.hbs', exphbs.create({
        extname: '.hbs',
        defaultLayout: 'main',
    }).engine);
    app.setViewEngine('hbs');
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map