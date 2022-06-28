const createInsertQueryString = (obj, table, isReturningValue) => {

    const array = Object.entries(obj);
    const arrayLength = array.length;
    const returning = isReturningValue ? ' RETURNING *;' : ';';

    let keysString = '';
    let valuesString = '';

    array.forEach((item, index) => {
        const ending = index + 1 === arrayLength ? '' : ', ';
        keysString += `${item[0]}${ending}`;
        valuesString += `'${item[1]}'${ending}`;
    });

    return `INSERT INTO ${table} ( ${keysString} ) VALUES ( ${valuesString} )${returning}`;
}

const createUpdateQueryString = (obj, condition, table, isReturningValue) => {

    const array = Object.entries(obj);
    const arrayLength = array.length;
    const returning = isReturningValue ? 'RETURNING *;' : ';';

    let updateString = '';


    array.forEach((item, index) => {
        const ending = index + 1 === arrayLength ? '' : ', ';
        updateString += `${item[0]} = '${item[1]}'${ending}`
    });

    return `
        UPDATE ${table}
        SET ${updateString}
        WHERE ${condition}
        ${returning}`;
}

const createDeleteQueryString = (condition, table, isReturningValue) => {
    const returning = isReturningValue ? 'RETURNING *;' : ';';

    return `
        DELETE FROM ${table}
        WHERE ${condition}
        ${returning}`;
}

const createSelectQueryString = (fields, table, condition, orderBy, limit, skip) => {

    let fieldsString = fields=='all'?'*':'';
    const skipValue = skip || 0;
    const limitValue = limit || 1;

    const cond = !!condition?`WHERE ${condition}`:'';
    const order = !!orderBy?`ORDER BY ${orderBy}`:'';

    if (!!fields&&fields!=='all') {
        fieldsString = '';
        fields.forEach((field, index) => {
            const ending = index + 1 === arrayLength ? '' : ', ';
            fieldsString += field+ending;
        });
    }

    return `
        SELECT ${fieldsString} FROM ${table}
        ${cond}
        ${order}
        LIMIT ${limitValue}
        OFFSET ${skipValue}`;
}


module.exports = {
    createInsertQueryString,
    createUpdateQueryString,
    createDeleteQueryString,
    createSelectQueryString
}