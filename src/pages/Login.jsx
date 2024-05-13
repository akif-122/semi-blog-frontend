import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import { json, useNavigate } from "react-router-dom"
import { serverUrl } from '../../utils/serverUrl';
import axios from "axios"

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
const Login = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.isLogin)

    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.post(`${serverUrl}/api/v1/user/login`, input);
            if (data.success) {
                alert("Login Successful")
                navigate("/")
                dispatch(login());

                localStorage.setItem("isLogin", true);
                localStorage.setItem("userId", data.user._id);

            }

        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    return (
        <div className="">
            <Box width={400}
                boxShadow={"10px 10px 20px #ccc"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                margin={"50px auto"}
                padding={3}

            >
                <Typography variant='h4' textTransform={"uppercase"} >Login</Typography>
                <TextField value={input.email} onChange={handleChange} width={"100%"} type="email" name='email' margin='dense' placeholder='Email' required />
                <TextField value={input.password} onChange={handleChange} width={"100%"} type="password" name='password' margin='dense' placeholder='Password' required />
                <Button onClick={handleSubmit} variant='contained' color='primary' sx={{ borderRadius: 3, marginTop: 3 }} >Login</Button>
                <Button onClick={() => navigate("/register")}>Don't have an account?</Button>
            </Box>
        </div>
    )
}

export default Login