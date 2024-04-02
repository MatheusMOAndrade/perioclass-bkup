import { createConnection } from "mysql";

export const connectMysqlMock = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'PerioClass',
    port: 3306
});
