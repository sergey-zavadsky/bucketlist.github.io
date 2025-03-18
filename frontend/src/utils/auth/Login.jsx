import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(false);
			if (user) {
				navigate('/');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	const provider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			setLoading(true);
			await signInWithPopup(auth_t, provider);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (loading) {
		return <div className={styles.container}>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.subContainer}>
				<div className={styles.buttons}>
					<button
						onClick={GoogleLogin}
						className={`${styles.button} ${styles.google}`}
						disabled={loading}
					>
						<FcGoogle />
						{intl(isLanguage).loginGoogle}
					</button>
				</div>
			</div>
		</div>
	);
}
