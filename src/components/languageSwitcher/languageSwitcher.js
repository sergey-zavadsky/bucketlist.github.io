import { useDispatch } from 'react-redux';
import { switchLanguage } from '../reducers/languageSwitcher/languageSwitcherReducer';
import { tr as intl } from '../../components/local/index';
import { useSelector } from 'react-redux';
import { Slider } from '../slider/slider';

const LanguageSwitcher = () => {
	const dispatch = useDispatch();
	const handleLanguageChange = (newLanguageCode) => {
		dispatch(switchLanguage(newLanguageCode.target.value));
	};

	const isLanguage = useSelector((state) => {
		return state.switchLanguage.currentLanguage;
	});

	return (
		<div>
			<Slider />
			<label htmlFor="languages">{intl(isLanguage).changeLanguage}</label>
			<select name="languages" id="languages" onChange={handleLanguageChange}>
				<option value="BY">BY</option>
				<option value="RU">RU</option>
			</select>
		</div>
	);
};

export default LanguageSwitcher;
