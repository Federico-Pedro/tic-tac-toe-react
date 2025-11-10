export const validateName = (name) => {
    if (!name || name.trim() === '') {
        return {
            valid: false,
            error: 'El nombre es obligatorio'
        }
    }

    if (name.length < 2 || name.length > 10) {
        return {
            valid: false,
            error: 'El nombre debe tener entre 2 y 10 caracteres'
        }
    }
    return {
        valid: true,
        error: null
    }
}

export const validatePlayers = (players) => {
    const player1 = validateName(players[0].name)
    const player2 = validateName(players[1].name)

    if (!player1.valid) return player1
    if (!player2.valid) return player2

    if (players[0].name === players[1].name){
        return {
            valid : false,
            error : "Los nombres deben ser diferentes"
        }
    }
    return {
        valid : true,
        error: null
    }
}