import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth as auth_t } from '../auth/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { tr as intl } from '../../components/local/index';
import { useSelector } from 'react-redux';
import styles from './SignIn.module.scss';

export default function Login() {
	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});
	const navigate = useNavigate();
	const [isAuht, setIsAuth] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				navigate('/');
			} else {
				navigate('/login');
			}
		});
	}, [isAuht]);

	const provider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			await signInWithPopup(auth_t, provider).then(() => {
				setIsAuth(true);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Join today</h2>
			<div className={styles.subContainer}>
				<div className={styles.buttons}>
					<button
						onClick={GoogleLogin}
						className={`${styles.button} ${styles.google}`}
					>
						<FcGoogle />
						{intl(isLanguage).loginGoogle}
					</button>
				</div>
			</div>
		</div>
		// <div>
		// 	<div>
		// 		<button onClick={GoogleLogin}>
		// 			<FcGoogle />
		// 			{intl(isLanguage).loginGoogle}
		// 		</button>
		// 	</div>
		// </div>
	);
}
