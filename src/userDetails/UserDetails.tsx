import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from "@mui/material/CircularProgress";
// import classes from 'UserDetails.css';



export const UserDetails = () => {
    const [userDetail, setUserDetail] = useState<any>({});
    const [isLoading, setLoading] = useState(true);
    const userParamId = useParams();
    const userNav = useNavigate();
    const userId = parseInt(userParamId.id!, 10);
    useEffect(() => {
        getUserById(userId);
    },[])

    const getUserById = (userId: number) => {
        return axios.get(`http://localhost:4000/users/${userId}`)
                .then((res) => {
                    console.log('Get User by Id: ', res);
                    setUserDetail(res.data);
                })
                .then((x) => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                })
                .catch((err) => {console.error(err)})
    };

    const allUsers = () => {
        userNav('/users');
    };   
    const valueStyles = {
        width: "50%", display: "flex", justifyContent: "flex-start"
    }; 
    const keyStyles = {
        width: "50%", display: "flex", justifyContent: "flex-end", paddingRight: "10px"
    };
     
    return (
        <div>
            <div>
                <h1>User Details</h1>
            </div>
            {isLoading && <CircularProgress></CircularProgress>}
            {!isLoading && 
                <div>
                    <div><img src={userDetail.avatar}></img></div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Name:</div>
                        <div style={valueStyles}>{userDetail.fName} {userDetail.lName} <CheckCircleIcon style={{ color: userDetail.emailVerified ? "green" : "gray"}}/></div>
                        
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Date of Birth:</div>
                        <div style={valueStyles}>{userDetail.dob}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Email:</div>
                        <div style={valueStyles}>{userDetail.email}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Company Name:</div>
                        <div style={valueStyles}>{userDetail.company?.name}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Company Department:</div>
                        <div style={valueStyles}>{userDetail.company?.department}</div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div style={keyStyles}>Skills:</div>
                        <div style={{width: "50%", display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>{userDetail.skills?.map((x: string) =>(
                        <div key={x} style={{display: "flex"}}>{x}</div>
                    ))}</div>
                    </div>
                    <div style={{paddingTop: "20px"}}>
                        <button onClick={allUsers}>All Users</button>
                    </div>
                </div>
            }
        </div>
    );
}