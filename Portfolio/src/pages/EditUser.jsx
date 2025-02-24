import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();
    const [user, setUser] = useState({ username: "", email: "", phone: "" });

    useEffect(() => {
        console.log("User ID:", id);  // Debugging line

        const fetchUser = async () => {
            try {
                const response = await fetch(`https://portfolio-pdrk.onrender.com/api/admin/users/${id}`, {
                    method:"GET",
                    headers: { Authorization: authorizationToken }
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                setUser(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://portfolio-pdrk.onrender.com/api/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) throw new Error("Failed to update user");

            toast.success("User updated successfully!");
            navigate("/admin/users");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange} required />

                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
