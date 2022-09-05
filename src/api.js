import axios from 'axios';

const server = "http://localhost:8080"

export const checkResetValid = async (email, token) =>
    await axios.get(`${server}/api/auth/check_reset?email=${email}&token=${token}`)

export const resetPassword = async (email, token, newPassword) =>
    await axios.patch(`${server}/api/auth/reset_password`, {
        "email": email,
        "token": token,
        "new_password": newPassword
    })