import {Indexed} from "../types";

export function isEqual(a: object, b: object): boolean {
    if (a && b) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        if (aKeys.length === bKeys.length && aKeys.every((val, index) => val === bKeys[index])) {
            return aKeys.every((key: string) => {
                if (typeof (a as any)[key] === "object" && typeof (b as any)[key] === "object") {
                    return isEqual((a as any)[key] as object, (b as any)[key] as object)
                }
                else return ((a as any)[key] === (b as any)[key])
            })
        }
        return false
    }
    else {return false}
}

export function cloneDeep<T extends object = object>(obj: T) {
    if (Array.isArray(obj)) {
        let temp: any[] = [];
        obj.forEach(one => {
            if (Array.isArray(one) || typeof one === "object") {
                temp.push(cloneDeep(one));
            }
            else {
                temp.push(one);
            }
        })
        return temp
    }
    else if (typeof obj === "object") {
        let temp: object = {};
        Object.keys(obj).forEach(key => {
            if (Array.isArray((obj as any)[key]) || typeof (obj as any)[key] === "object") {
                (temp as any)[key] = cloneDeep((obj as any)[key]);
            }
            else {
                (temp as any)[key] = (obj as any)[key];
            }
        })
        return temp
    }
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('Path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}
