"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5540',
    database: 'nestjs',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //migrations: [__dirname + 'dist/database/migrations/*.js'],
    synchronize: true
};
//# sourceMappingURL=typeorm.config.js.map