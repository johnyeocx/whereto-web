import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { checkResetValid, resetPassword } from '../../api';
import moment from 'moment';
import './ResetPassword.css'

function ResetPassword() {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState(false);
    const [deadline, setDeadline] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();

    const [reqSuccess, setReqSuccess] = useState(0)

    const checkIsValid = async () => {
        const email = searchParams.get("email")
        const token = searchParams.get("token")

        try {
            const res = await checkResetValid(email, token)
            console.log(res)
            const tokenDeadline = moment(res.data.deadline)
            setDeadline(tokenDeadline)
        } catch (error) {
            console.log("Setting error to true")
            setIsError(true)
        }
        setLoading(false)
    }

    const resetButtonClicked = async () => {

        const email = searchParams.get("email")
        const token = searchParams.get("token")

        try {
            const res = await resetPassword(email, token, password)
            setReqSuccess(1)
        } catch (error) {
            setReqSuccess(-1)
        }
    }

    useEffect(() => {
        checkIsValid()
    }, [])

    if (reqSuccess == 1) {
        return (
            <div className="overall">
                <h3 style={{ fontWeight: "500", color: "white" }}>Successfully reset password!</h3>
            </div>
        )
    }

    if (reqSuccess == -1) {
        return (
            <div className="overall">
                <h3 style={{ fontWeight: "500", color: "white" }}>Failed to reset password. Generate a new link and try again!</h3>
            </div>
        )
    }

    if (isError || moment(Date.now()).isAfter(moment(deadline))) {
        return (
            <div className="overall">
                <h3 style={{ fontWeight: "500", color: "white" }}>Password reset link is expired or invalid. Please generate a new one</h3>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="overall">
                Loading
            </div>
        )

    }

    return (
        <div className="overall">
            <div className="container">
                <h1>Reset Password</h1>

                <div className="form__group field">
                    <input
                        type="password"
                        className="form__field"
                        placeholder="Name"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form__label">New Password</label>
                </div>

                <div className="form__group field" >
                    <input
                        type="password"
                        className="form__field"
                        placeholder="New Password"
                        id="confirm-password"
                        required

                    />
                    <label className="form__label" > Confirm Password</label >
                </div >


                <button id="submit-btn" onClick={(e) => resetButtonClicked()}>Change Password</button>
            </div >
        </div >

    )
}

export default ResetPassword