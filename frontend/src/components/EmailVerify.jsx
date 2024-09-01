import React, { useEffect, useState } from 'react'
import { userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { Link, useParams } from 'react-router-dom';


function EmailVerify() {

    const [user, setUser] = useAtom(userAtom);

    const [validUrl, setValidUrl] = useState(true);
	const {id , token } = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
                const url = `http://localhost:5000/api/auth/user/${id}/verify/${token}`;

                const res = await fetch(url);
                const data = await res.json();

				console.log(data);
                setUser(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, []);

  return (
    <div>
      {validUrl ? (
				<div >
					<h1>Email verified successfully</h1>
					{user.role === "shopkeeper" &&  <Link to="/detail">
						<button>Go To Detail Page</button>
					</Link> } 
                    {user.role === "consumer" && <Link to="/login">
						<button>Login</button>
					</Link>}
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
    </div>
  )
}

export default EmailVerify
