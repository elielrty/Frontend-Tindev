import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './Main.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';


export default function Main( { match } ) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUser() {
            const response = await api.get('/devs', {
                headers: {
                user: match.params.id,
                }
            } )
            setUsers(response.data);
        }
        loadUser();
    }, [match.params.id]);

    async function handleLike(id){
        console.log('like', id)
    }

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislike`, null, {
            headers: { user: match.params.id },
        })
    }
    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? (
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                         </footer>
                         <div className="buttons">
                            <button type='button' onClick={() => handleDislike(user._id)}>
                                <img src={dislike} alt="Dislike"/>
                            </button>
                            <button type='button' onClick={() => handleLike(user._id)}>
                                <img src={like} alt="Likes"/>
                            </button>
                        </div>
                    </li>
                ) )}
            </ul>
            ) : (
                <div className="empty">Acabou :( </div>
            )
            }

        </div> 
    )
}