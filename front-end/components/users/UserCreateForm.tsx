import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { FormEvent, useState } from "react";

const UserCreateForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setStatusMessages([]);
    };

    const validate = () => {
        let isValid = true;
        if (!email.trim()) {
            setEmailError("email is required");
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError("password is required");
            isValid = false;
        }
        return isValid;
    };

    const createUser = async () => {
        const res = await UserService.createUser(email, password);
        const message = res.message;
        const type = res.status;
        setStatusMessages([{ message, type }]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearErrors();
        if (!validate()) return;
        await createUser();
    }

    return (
        <>
            {statusMessages && (
                <ul>
                    {statusMessages.map(({ message, type }, i) => (
                        <li key={i} className={type}>
                            {message}
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>

                <label htmlFor="emailInput">Email</label><br />
                <input
                    id="emailInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                {emailError && (<div>{emailError}</div>)}

                <label htmlFor="passwordInput">Password</label><br />
                <input
                    id="passwordInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                {passwordError && (<div>{passwordError}</div>)}

                <button type="submit">Sign up</button>

            </form>
        </>
    );
}

export default UserCreateForm;