export const goToSignUp = (history) => {
    history.push("/signup")
}

export const goToLogin = (history) => {
    history.push("/login")
}

export const goToSearch = (history) => {
    history.push("/cartoons/search")
}
export const goToHome = (history) => {
    history.push("/cartoons")
}

export const goToCartoon = (history, id) => {
    history.push(`/cartoons/${id}`)
}