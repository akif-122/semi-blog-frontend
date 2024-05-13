import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../utils/serverUrl';
import BlogCard from '../components/BlogCard';
const Blog = () => {
    const navigate = useNavigate()
    const isAuth = localStorage.getItem("isLogin");

    const [blogs, setblogs] = useState([]);
    console.log(blogs)

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/v1/blog/all-blogs`);

            if (data?.success) {
                setblogs(data?.blogs);
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${serverUrl}/api/v1/blog/delete-blog/${id}`);
            if (data?.success) {
                alert("Blog Deleted")

                getAllBlogs();
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [])
    useEffect(() => {
        getAllBlogs();

    }, [])
    return (
        <div>
            {
                blogs?.map((blog) => {
                    return (
                        <BlogCard item={blog} key={blog._id} deleteBlog={handleDelete} />
                    )
                })
            }
        </div>
    )
}

export default Blog