import type { RefObject } from 'react';
import { Toast } from 'primereact/toast';

let toastRef: RefObject<Toast | null> | null = null;

const setToast = (ref: RefObject<Toast | null>) => {
    toastRef = ref;
};

const showInfo = (message: string) => {
    toastRef?.current?.show({
        severity: 'info',
        summary: 'Info',
        detail: message
    });
};

const showSuccess = (message: string) => {
    toastRef?.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: message
    });
};

const showError = (message: string) => {
    toastRef?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: message
    });
};

export const toastService = {
    setToast,
    showInfo,
    showSuccess,
    showError
};