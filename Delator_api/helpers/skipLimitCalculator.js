const calculateSkipLimit = (skip, limit, max) => {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10) || 0;
    const maxResponseCount = parseInt(max, 10);
    const calculatedLimit = (!limitInt || limitInt > maxResponseCount) ? maxResponseCount : limitInt;
    return {skip: skipInt, limit: calculatedLimit}
};


module.exports = { calculateSkipLimit };