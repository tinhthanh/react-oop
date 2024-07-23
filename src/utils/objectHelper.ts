import { AnyType } from "../types/baseType";

export class ObjectHelper {
    /**
     * Deep copy any object
     * @param value 
     * @returns 
     */
    public static deepCopy<T extends object>(value: T): T {
        const deepObject = structuredClone(value) as AnyType;
        const newObject = Object.create(value);
        const allKeys = Object.keys(deepObject);
        for (const element of allKeys) {
            if (typeof newObject[element] != 'object') {
                newObject[element] = deepObject[element];
            }
            else {
                if (newObject[element] == undefined) {
                    newObject[element] = deepObject[element];
                }
            }
        }
        return newObject;
    }

    /**
     * Deep copy any object
     * @param value 
     * @returns 
     */
    public static deepCopyHemers<T extends object>(value: T): T {
        const deepObject = JSON.stringify(value) as AnyType;
        const newObject = Object.create(value);
        const allKeys = Object.keys(deepObject);
        for (const element of allKeys) {
            if (typeof newObject[element] != 'object') {
                newObject[element] = deepObject[element];
            }
            else {
                if (newObject[element] == undefined) {
                    newObject[element] = deepObject[element];
                }
            }
        }
        return newObject;
    }
}