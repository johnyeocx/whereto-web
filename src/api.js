import axios from 'axios';

const server = process.env.NODE_ENV ==
    "dev" ? "http://localhost:8080" : "https://api.whereto.lol"

export const checkResetValid = async (email, token) =>
    await axios.get(`${server}/api/auth/check_reset?email=${email}&token=${token}`)

export const resetPassword = async (email, token, newPassword) =>
    await axios.patch(`${server}/api/auth/reset_password`, {
        "email": email,
        "token": token,
        "new_password": newPassword
    })