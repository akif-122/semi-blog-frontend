import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../utils/serverUrl';
import BlogCard from '../components/BlogCard';

const UserBlog = () => {
    const [blogs, setblogs] = useState([]);
    const userId = localStorage.getItem("userId");

    const getUserBlogs = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/v1/blog/user-blog/${userId}`);
            if (data?.success) {
                setblogs(data?.userBlog?.blogs);
            }
            console.log(blogs)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <>

            {
                blogs?.map((blog) => {
                    return (
                        <BlogCard item={blog} key={blog?._id} />
                    )
                })
            }

        </>
    )
}

export default UserBlog