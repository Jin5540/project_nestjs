import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SeederOptions } from 'typeorm-extension';

export const typeORMConfig : TypeOrmModuleOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5540',
    database: 'nestjs',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    seeds: [__dirname + '/src/db/seeds/*.seeder.{js,ts}'],
    synchronize: true
}