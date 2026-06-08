interface SequelizeError extends Error {
    name: string;
    original?: {
        errno: number;
    };
    errors?: Array<{
        path: string;
        type: string;
        message: string;
    }>;
}

interface ErrorResponse {
    data: Array<{ field: string; message: string }>;
    metaData: {
        message: string;
        code: number;
        response_code: string;
    };
}

export const sequelizeDB = async (error: SequelizeError): Promise<ErrorResponse> => {
    console.log('error handle query:', error);

    const response: ErrorResponse = {
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

export default { sequelizeDB };
