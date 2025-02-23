
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [contacts, setContacts] = useState([]);

    // Fetch all contacts
    const getAllContacts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch contact data");
            }

            const data = await response.json();
            setContacts(data);
        } catch (error) {
            toast.warn(error.message);
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    // Delete contact by ID
    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete contact");
            }

            toast.success("Contact deleted successfully!");
            getAllContacts(); // Refresh the list
        } catch (error) {
            toast.warn(error.message);
        }
    };

    return (
        <section>
            <div className="container">
                <h1>Admin Contact Messages</h1>
            </div>
            <div className="container admin-contacts">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>
                                    <button onClick={() => deleteContact(contact._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
