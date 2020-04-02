module.exports.validate = (data) => {
    /* 
        TODO - This is a temporary function 
        We need to apply a validation for every input field with a user friendly message 
    */

    // This util function only validates data that is structured with objects
    if (typeof data !== 'object') return false;

    const dataFields = Object.keys(data);
    Object.keys(data).forEach((field) => {
        if (!dataFields[field])
            throw new Error(`The field ${field} has a invalid value`);
    });

    return true;
};
