"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeDB = void 0;
const sequelizeDB = async (error) => {
    console.log('error handle query:', error);
    const response = {
        data: [],
        metaData: {
            message: error.message,
            code: 500,
            response_code: '0001'
        }
    };
    // mysql code error foreigen key 1452
    if (error.name && error.name === 'SequelizeForeignKeyConstraintError' && error.original?.errno === 1452) {
        response.metaData.message = 'foreign key constraint fails';
        response.metaData.code = 422;
        response.metaData.response_code = '5542';
    }
    if (error.errors) {
        const newError = error.errors.map((e) => {
            return {
                field: e.path,
                message: e.type === 'unique violation' ? 'Data has been entered.' : e.message
            };
        });
        response.data = [...response.data, ...newError];
        response.metaData.code = 422;
        response.metaData.response_code = '5574';
    }
    return response;
};
exports.sequelizeDB = sequelizeDB;
exports.default = { sequelizeDB: exports.sequelizeDB };
//# sourceMappingURL=error-format.js.map