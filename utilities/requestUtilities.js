exports.validatedRequestBody = (requestBody, expectedKeys) => {
    const keysNotFound = []

    for (const key of expectedKeys) {
        if (!(key in requestBody)) {
            keysNotFound.push(key)
        }
    }

    return keysNotFound
}