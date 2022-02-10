export default function createProductsValidation(values) {
    let errors: any = {};

    if (!values.name) errors.name = 'Name is required'

    if (!values.company) errors.company = 'Company is required'

    if (!values.url) {
        errors.url = 'URL is required'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "URL not valid"
    }

    if (!values.description) errors.description = "Description is required"

    return errors
}