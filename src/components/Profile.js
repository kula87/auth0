import React from 'react';
import JSONPretty from 'react-json-pretty';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const hoistAPI = process.env.REACT_APP_USER_HOIST_API;

    const createCustomer = () => {
        getAccessTokenSilently().then(token => {
            console.log(token);
            console.log('http://localhost:3001/user/validate');
            fetch(hoistAPI + '/user/validate', {
                headers : {
                    Authorization: "Bearer " + token
                }
            })
            .then(res => res.json())
            .then(json => console.log(json));
        })
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <JSONPretty data={user}></JSONPretty>
                {/* { JSON.stringify(user, null, 2) } */}
                <button onClick={createCustomer}>Create Customer</button>
            </div>

        )
    )
}

export default Profile;