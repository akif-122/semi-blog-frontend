import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { serverUrl } from '../../utils/serverUrl';
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        username: "",
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
            const { data } = await axios.post(`${serverUrl}/api/v1/user/register`, input);
            if (data.success) {
                alert("Registration Successful")
                navigate("/login")
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
                <Typography variant='h4' textTransform={"uppercase"} >Registration</Typography>
                <TextField value={input.username} onChange={handleChange} width={"100%"} type='text' name='username' margin='dense' placeholder='Name' required />
                <TextField value={input.email} onChange={handleChange} width={"100%"} type="email" name='email' margin='dense' placeholder='Email' required />
                <TextField value={input.password} onChange={handleChange} width={"100%"} type="password" name='password' margin='dense' placeholder='Password' required />
                <Button onClick={handleSubmit} variant='contained' color='primary' sx={{ borderRadius: 3, marginTop: 3 }} >Register</Button>
                <Button onClick={() => navigate("/login")}>Already have an account?</Button>
            </Box>
        </div>
    )
}

export default Register