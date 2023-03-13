export default function (string: string, type: string): boolean {
    let reg;
    let result;
    switch (type){
        case 'name':
            reg = '^[A-ZА-Я][a-zA-ZА-Яа-я\\-]*$';
            result = string.match(reg);
            if (!result || result.length !== 1) return false
            break
        case 'login':
            reg = '^(?=.*[A-Za-z])(?:[a-zA-Z0-9_-]){3,20}$';
            result = string.match(reg);
            if (!result || result.length !== 1) return false
            break
        case 'email':
            reg = '^[a-z][a-z0-9\-]*\@[a-z]*\.[a-z]*$';
            result = string.match(reg);
            if (!result || result.length !== 1) return false
            break
        case 'phone':
                reg = '^\\+?[0-9]{10,15}$';
            result = string.match(reg);
            if (!result || result.length !== 1) return false
            break
        case 'password':
            reg = '^(?=.*[0-9])(?=.*[a-zA-Z])(?:[a-zA-Z0-9_-]+){8,40}$';
            result = string.match(reg);
            if (!result || result.length !== 1) return false
            break
        case 'message':
            if (string.length < 1) return false
            break
    }
    return true
}
