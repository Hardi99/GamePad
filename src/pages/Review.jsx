import { useState } from 'react';
import '../App.css';
import axios from 'axios';

//Components
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';

const Review = ({token, handleToken}) => {

    const navigate = useNavigate(); // rappel

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const time = new Date().getTime();
    const date = new Date(time)

    const { id } = useParams();

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleText = (event) => {
        setText(event.target.value);
    }

    return (
        <div className='container'>
            <Header token={token} handleToken={handleToken} />

            <form action="" className='form-review'
                onSubmit={async e => {
                    e.preventDefault();
                    console.log(token);

                    const formData = new FormData();
                    formData.append('title', title);
                    formData.append('text', text);
                    formData.append('game_id', id);
                    formData.append('date', date.toString())

                    try {
                        //Changement des arguments du axios.post
                        const response = await axios.post(
                            "http://localhost:3000/games/reviews",

                            formData,

                            // L'objet headers sert à s'authentifier auprès du serverur à l'aide du Bearer token
                            {headers : {
                                Authorization: "Bearer " + token,
                                "Content-Type": 'multipart/form-data'
                            }}
                        )
                            //Le stringify convertit le format JSON en string
                            console.log(JSON.stringify(response.data))
                            console.log("Response:", response.data);
                            navigate(`/games/${id}`);
                    } catch (err) {
                        console.error(err)
                        if (err.response.status === 500) {
                            console.error("An error occured");
                        } else {
                            console.log(err.response.data)
                            console.error(err.response.data.msgs)
                        }
                    }
                }}>
                <label htmlFor="">Review Title</label>
                <input type="text" onChange={handleTitle} />
                
                <label htmlFor="">Review Text</label>
                <textarea name="" id="" cols="30" rows="10" onChange={handleText}></textarea>
            </form>
        </div>
    )
}

export default Review