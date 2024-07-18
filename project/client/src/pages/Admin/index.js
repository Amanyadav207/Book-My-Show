import React, { Children,useEffect } from 'react'

import {message,Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import MovieFrom from './MovieForm'
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
    const checkUser = async () => {
        const user = await axios.get("/api/users/get-current-user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (user.data.data.role === "partner" ) {
            navigate("/partner");
            message.error("You are not allowed to access this page");
        }
        else if(user.data.data.role === "user")
        {
            navigate("/");
            message.error("You are not allowed to access this page");
        }
        else
        {

        }
    }

    useEffect(() => {
        checkUser()
    }, []);

    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>

        },

        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ]


  return (
    <div>
      <Layout>
            <Header
                className="d-flex justify-content-between"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "0 20px"
                }}
            >
                <h3 className="demo-logo text-white m-0" style={{ color: "white", fontFamily: "'Poppins', sans-serif" }}>
                    Book My Show
                </h3>
                <button 
                    onClick={logout} 
                    style={{
                        color: "white",
                        background: "transparent",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px 15px",
                        cursor: "pointer",
                        transition: "background 0.3s, color 0.3s"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#182848";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "white";
                    }}
                >
                    LogOut
                </button>
            </Header>
        </Layout>
        <h1>Admin Page</h1>
        <Tabs items={tabItems}/>
    </div>
  )
}

export default Admin