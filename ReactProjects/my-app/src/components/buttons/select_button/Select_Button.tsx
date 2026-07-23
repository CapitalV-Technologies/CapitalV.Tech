import './Select_Button.css';
import { SelectButton } from 'primereact/selectbutton';

type SelectButtonProps = {
	options: string[];
	value: string;
	onChange: (value: string) => void;
}

export default function Select_Button (props : SelectButtonProps) {

	return (
		<SelectButton className="select-button" value={props.value} options={props.options} onChange={(e) => props.onChange(e.value)}
		allowEmpty={false}/>
	);
}