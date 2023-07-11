export const goToSignUp = (nav) => {
    nav("/signup")
}

export const goToLogin = (nav) => {
    nav("/login")
}

export const goToSearch = (nav) => {
    nav("/cartoons/search")
}
export const goToHome = (nav) => {
    nav("/cartoons")
}

export const goToCartoon = (nav, id) => {
    nav(`/cartoons/${id}`)
}

export const goToForgot = (nav) => {
    nav("/forgot-password")
}
export const goToVerify = (nav) => {
    nav("/verification-code")
}

export const goToReset = (nav) => {
    nav("/reset-password")
}
