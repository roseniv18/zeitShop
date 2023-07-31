const generateFullProductName = (
    brand: string,
    model: string,
    model_info: string,
    maxLength?: number
) => {
    let fullProductName = `${brand} ${model} ${model_info}`.toLocaleUpperCase()
    if (maxLength) {
        return fullProductName.substring(0, maxLength).concat("...")
    } else {
        return fullProductName
    }
}

export default generateFullProductName
