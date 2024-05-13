import axios from 'axios';
import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { serverUrl } from '../../utils/serverUrl';

const BlogCard = ({ item, deleteBlog }) => {
    const userId = localStorage.getItem("userId");


    return (
        <>
            <div className="card-sec">
                <div className="card-img">
                    <img src={item?.image} alt="" />
                </div>
                <div className="card-content">
                    <h3>{item?.title}</h3>
                    <p>{item?.description}</p>
                    <span>{item?.user?.username}</span>
                    {
                        userId === item.user._id ?
                            <div className="text-end">
                                <Link to={`/edit-blog/${item._id}`} >Edit</Link>
                                <Link onClick={() => deleteBlog(item._id)} >Delete</Link>
                            </div>
                            :
                            null
                    }

                </div>
            </div>
        </>
    )
}

export default BlogCard