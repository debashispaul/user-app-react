import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export interface UserType {
    id: number;
    fName: string;
    lName: string;
}

export const Users = () => {
    const [allUsers, setAllUsers] = useState<Array<UserType>>([]);
    const [isLoading, setLoading] = useState(true);
    const userNav = useNavigate();
    useEffect(() => {
        getUsers();        
    }, []);

    const getUsers = () => {
        return axios.get('http://localhost:4000/users')
        .then((res) => {
            console.log('Api data: ', res);
            setAllUsers(res.data);
        })
        .then((x) => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        })
        .catch((err) => console.error(err));
    };
    const userDetails  = (id: number) => {
        console.log(id);
        userNav(`/users/${id}`);
    } 


    return (
        <div>
            <div>
                <h1>All Users</h1>
            </div>
            {isLoading && <CircularProgress></CircularProgress>}
            {!isLoading && 
                <table style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <thead>
                    <tr>
                        <th style={{width: "50px", textAlign: "left"}}>ID</th>
                        <th style={{width: "100px", textAlign: "center"}}>First Name</th>
                        <th style={{width: "100px", textAlign: "center"}}>Last Name</th>
                        <td style={{width: "150px", textAlign: "center"}}> </td>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((usr) => (
                        <tr key={usr.id}>
                            <td style={{width: "50px", textAlign: "left"}}>{usr.id}</td>
                            <td style={{width: "100px", textAlign: "center"}}>{usr.fName}</td>
                            <td style={{width: "100px", textAlign: "center"}}>{usr.lName}</td>
                            <td style={{width: "150px", textAlign: "center"}}>
                                <button onClick={() => {userDetails(usr.id)}}>More Info</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
            
        </div>
        
    );
};