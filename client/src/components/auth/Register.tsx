import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EventType {
    InputEvent: React.ChangeEvent<HTMLInputElement>;
}

function Register({ setisLogin }: RegisterProps) {

  const { setUser, setIsAuthenticated, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()

    const [error, setError] = useState({
        emailError: false,
        passwordError: false,
        repeatPassError: false,
    });
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email && !password) {
            setError((prev) => {
                return { ...prev, emailError: true, passwordError: true };
            });
            return;
        }
        if (!email) {
            setError((prev) => {
                return { ...prev, emailError: true };
            });
            return;
        }
        if (!password) {
            setError((prev) => {
                return { ...prev, passwordError: true };
            });
            return;
        }
        if (repeatPass !== password) {
            setError((prev) => {
                return { ...prev, repeatPassError: true };
            });
            return;
        }

        setLoading(true);
        axios
          .post("/auth/signup", { email, password })
          .then((res) => {
            setIsAuthenticated(true);
            setUser(res.data?.content?.data);
            localStorage.setItem("token", res.data?.meta?.access_token);
            setLoading(false);
            navigate("/home");
          })
          .catch(({response}) => {
            setLoading(false);
            setSnackbar((prev) => {
              return { ...prev, open: true, message: response?.data?.error };
            });
          });
    };


    const handleChange = (e: EventType[`InputEvent`], field: string) => {
        const text = e.target.value;
        const newField = field + "Error";
        // Removing error state if value in particular input is changes
        if (text) {
            setError((prev) => {
                return { ...prev, [newField]: false };
            });
        }
        if (field === "email") setEmail(text);
        else if (field === "password") setPassword(text);
        else if (field === "repeatPass") setRepeatPass(text);
    };
    return (
        <main className='bg-secondary shadow-xl md:w-[60%] bdmd:w-[40%] py-2 px-4 rounded-xl'>
            <h1 className='text-2xl text-center mt-[10px]'>Sign Up</h1>

            <form className='w-[100%] relative'>
                <TextField
                    id="filled-search"
                    label="Email address"
                    variant="filled"
                    type='email'
                    sx={{
                        marginTop: '30px',
                        width: '100%',
                        '& .css-batk84-MuiInputBase-root-MuiFilledInput-root': {
                            borderBottom: `${error.emailError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={email}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "email")}

                />
                {error.emailError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[60px]">Can't be empty</p>
                )}
                <TextField
                    id="filled-search"
                    label="Password"
                    variant="filled"
                    type='text'
                    sx={{
                        marginTop: '20px',
                        width: '100%',
                        '& .css-batk84-MuiInputBase-root-MuiFilledInput-root': {
                            borderBottom: `${error.passwordError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={password}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "password")}
                />
                {error.passwordError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[140px]">Can't be empty</p>
                )}

                <TextField
                    id="filled-search"
                    label="Repeat password"
                    variant="filled"
                    type='text'
                    sx={{
                        marginTop: '20px',
                        width: '100%',
                        '& .css-batk84-MuiInputBase-root-MuiFilledInput-root': {
                            borderBottom: `${error.repeatPassError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={repeatPass}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "repeatPass")}
                />
                {error.repeatPassError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[215px]">Should match with password</p>
                )}


                <LoadingButton
                    loadingPosition="start"
                    onClick={handleRegister}
                    loading={loading}
                >
                    {!loading && "Create an account"}
                </LoadingButton>
            </form>
            <div className='flex items-center justify-center gap-3 mb-[20px]'>
                <p>Already have an account?</p>
                <div role='button' className='text-secondary' onClick={() => setisLogin(true)}>Login</div>
            </div>

        </main>
    )
}

export default Register