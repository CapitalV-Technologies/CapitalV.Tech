import './Toast.css'
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { toastService} from '../../services/toastService'


export default function AppToast() {
    const toastRef = useRef<Toast>(null);

    useEffect(() => {
        toastService.setToast(toastRef);
    }, []);

    return (  
        <Toast className="toast-styles" ref={toastRef} />
    );
}