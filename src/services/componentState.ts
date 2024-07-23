import { ObjectHelper } from "../utils/objectHelper";

export abstract class ComponentState  {
   
    public abstract init(): void;

    constructor() {}

    /**
     * Deep copy current state
     * @returns 
     */
    public copy<TObject>(): TObject {
        return ObjectHelper.deepCopy(this) as unknown as TObject;
    }
}