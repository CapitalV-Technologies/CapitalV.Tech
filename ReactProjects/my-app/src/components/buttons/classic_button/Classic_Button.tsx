import './Classic_Button.css';
import { Button } from 'primereact/button';

type ClassicButtonProps = {
	label: string;
	onClick: (() => void) | ((e: React.FormEvent) => void);
}

export default function Classic_Button (props : ClassicButtonProps) {

	return (
		<Button label={props.label} className="classic-button" onClick={props.onClick}/>
	);
}