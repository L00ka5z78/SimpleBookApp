import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Add = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        } catch (err) {
            console.log(err);
            setError(true)
        }

    };


    return (
        <div className="form">
            <h1>Add new book</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title" />

            <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
            <input type="numbert" placeholder="price" onChange={handleChange} name="price" />
            <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
            <button className="formButton" onClick={handleClick}>ADD</button>
        </div>
    )
}
export default Add;
