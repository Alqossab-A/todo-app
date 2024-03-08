export const validateUserLoginForm = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username is Required';
    } else if (values.username.length < 5) {
        errors.username = 'Must be at least 5 characters.';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }

    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be at least 8 characters.';
    }

    return errors;
};