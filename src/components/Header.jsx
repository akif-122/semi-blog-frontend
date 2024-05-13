import React, { useEffect } from 'react'
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../redux/slices/authSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.isLogin);
    const isAuth = localStorage.getItem("isLogin");


    const handleLogout = () => {
        try {
            localStorage.removeItem("isLogin");
            localStorage.removeItem("userId");
            dispatch(logout())
            alert("Logout Successful")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const isUserLoggedIn = async () => {
        let isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            dispatch(login());
        }
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }

        isUserLoggedIn();
    }, [])


    return (
        <>
            <AppBar sx={{ position: "sticky", top: 0 }}>
                <Toolbar>
                    <Typography variant='h4'>
                        Blog App
                    </Typography>

                    <Box display={"flex"} marginLeft={"auto"}>
                        {
                            isLogin ?
                                <>
                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/" >Blogs</Button>
                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/user-blog" >My Blogs</Button>

                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/create-blog" >Create Blog</Button>
                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="" onClick={handleLogout} >Logout</Button>
                                </>
                                :
                                <>
                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login" >Login</Button>
                                    <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register" >Register</Button>
                                </>
                        }
                    </Box>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default Header