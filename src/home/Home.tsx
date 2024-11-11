import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const nav = useNavigate();
    const goUsers =()=> {
        console.log('Clicked');
        nav('/users');
    };

    return (
        <div>
            <button onClick={goUsers}>Users</button>
        </div>
    );
};