import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { serverUrl } from '../../utils/serverUrl';
import axios from "axios"
import { useParams } from "react-router-dom"

const EditBlog = () => {
    const params = useParams()
    const { id } = params;
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [input, setInput] = useState({
        title: "",
        description: "",
        image: "",
        user: userId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }


    const getBlog = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setInput({
                    ...input,
                    title: data?.blog?.title,
                    description: data?.blog?.description,
                    image: data?.blog?.image,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlog()
    }, [])

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.put(`${serverUrl}/api/v1/blog/update-blog/${id}`, input);
            if (data.success) {
                alert("Blog Updated Successful")
                navigate("/")
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
                <Typography variant='h5' textTransform={"uppercase"} >Create a Blog</Typography>
                <TextField value={input.title} onChange={handleChange} width={"100%"} type='text' name='title' margin='dense' placeholder='Title' required />
                <TextField value={input.description} onChange={handleChange} width={"100%"} type="text" name='description' margin='dense' placeholder='Description' required />
                <TextField value={input.image} onChange={handleChange} width={"100%"} type="text" name='image' margin='dense' placeholder='Image' required />
                <Button onClick={handleSubmit} variant='contained' color='primary' sx={{ borderRadius: 3, marginTop: 3 }} >Create</Button>
            </Box>
        </div>
    )
}

export default EditBlog