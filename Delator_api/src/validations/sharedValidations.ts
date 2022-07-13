import yup from 'yup';

const idParamSchema = yup.object({
    id: yup.string().min(24).max(24).required()
});

export {idParamSchema};