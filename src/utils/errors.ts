import Block from "./Component";
import inputCheck from "./inputCheck";

export function getErrorText(type: string): string {
    switch (type) {
        case 'login':
            return 'Логин или ник могут содержать от 3 до 20 символов, буквы и цифры'
            break
        case 'password':
            return 'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавную букву и цифру'
            break
        case 'name':
            return 'Имя должно содержать только буквы'
            break
        case 'email':
            return 'Почта может включать цифры и и буквы'
            break
        case 'phone':
            return 'Телефон может содержать от 10 до 15 символов и начинаться с +'
            break
    }
    return ''
}

export function checkError(field: Block, type: string): boolean {
    const check = inputCheck(field.inputValue, type);
    if (!check) {
        field.element.classList.add('error');

        if (!document.getElementById('error' + field.id)) {
            const error = document.createElement('div');
            error.id = 'error' + field.id;
            error.classList.add('error-text')
            error.textContent = getErrorText(type);
            field.element.parentElement!.appendChild(error);
        }
    }
    return check
}

export function checkErrorProfile(field: Block, type: string): boolean {
    const check = inputCheck(field.inputValue, type);
    if (!check) {
        field.element.classList.add('error');

        if (!document.getElementById('error' + field.id)) {
            const error = document.createElement('div');
            error.id = 'error' + field.id;
            error.classList.add('error-text-profile')
            error.textContent = getErrorText(type);
            const parent = field.element.parentElement as HTMLElement;
            parent.after(error);
        }
    }
    return check
}
