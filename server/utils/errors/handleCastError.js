const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Passed id is invalid!',
        },
    ];

    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error occurs!',
        errorMessages: errors,
    };
};

export default handleCastError;