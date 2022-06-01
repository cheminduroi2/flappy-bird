import React, { useState } from 'react';
import './index.css';

export const Auth = (props) => {

    const [isNewUser, setIsNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const onUsernameChange = (event) => setUsername(event.target.value);
    const onEmailChange = (event) => setEmail(event.target.value);
    const onUsernameOrEmailChange = (event) => setUsernameOrEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);

    const onClickSignUp = () => setIsNewUser(true);
    const onClickLogin = () => setIsNewUser(false);

    const validateForm = () => {
        return [];
    }

    const onSubmit = () => {
        const fieldErrors = validateForm();
        if (fieldErrors.length < 1) {
            if (isNewUser) {
                // api call to sign user up (username,email,password)
            } else {
                // api call to log user in (usernameOrEmail, password)
            }
        } else {
            setFormErrors(fieldErrors);
        }
    };
    
    return (
        <div className="auth">
            <div className="form-container">
                <form>
                    <div className="form-inner">
                        <h2 className="form-title">{isNewUser ? 'Log In' : 'Sign Up'}</h2>
                        {formErrors.length > 0 && (
                            <ul>
                                {formErrors.map((err, index) => <li key={index}>{err}</li>)}
                            </ul>
                        )}
                        {isNewUser ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" name="username" id="username" value={username} onChange={onUsernameChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" id="email" value={email} onChange={onEmailChange} />
                                </div>
                            </>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="usernameOrEmail">Username/Email:</label>
                                <input type="text" name="usernameOrEmail" id="usernameOrEmail" value={usernameOrEmail} onChange={onUsernameOrEmailChange} />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" value={password} onChange={onPasswordChange} />
                        </div>
                        {isNewUser ? (
                            <div className="switch-auth">Already registered?&nbsp;<span className="switch-auth-link" onClick={onClickLogin}>Log in</span></div>
                        ) : (
                            <div className="switch-auth">New here?&nbsp;<span className="switch-auth-link" onClick={onClickSignUp}>Sign up</span></div>
                        )}
                        <button className="btn-submit" onClick={onSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};