import { Sequelize, QueryTypes, Op } from 'sequelize';
interface DatabaseModels {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    Op: typeof Op;
    QueryTypes: typeof QueryTypes;
}
declare const db: DatabaseModels;
export default db;
//# sourceMappingURL=mysql.connection.d.ts.map