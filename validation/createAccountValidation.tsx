export default function createAccountValidation(values) {
    let errors: any = {};

    if (!values.name) errors.name = 'Name is required'

    if (!values.email) {
        errors.email = 'Name is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }

    if (values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 6) {
        errors.password = 'Password must have more than 6 characters'
    }

    return errors
}