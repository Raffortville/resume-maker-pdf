
const checkInputFormat = (input, type) => {

    if (type === 'email') {
        const pattern = new RegExp(/.+@.+\..+/i)
        if (!pattern.test(input)) return false
        else return true

    } else if (type === 'password') {
        if(input.length < 7) return false
        else return true

    } else if (type === 'text') {
        const letters = /^[A-Za-z]+$/
        if(input.match(letters)) return true
        else return false

    } else if (type === 'number') {
        const numbers = /^[0-9]+$/
        if(input.match(numbers)) return true
        else return false

    }
}

const isStringEmpty = input => {
    if (input === undefined || input === null || input === '') return true
    else return false
}

const firstLetterCapital = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {checkInputFormat, isStringEmpty, firstLetterCapital}