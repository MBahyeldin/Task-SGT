
import { z } from 'zod';


export default interface Form {
    fields: FormField[];
    schema: z.ZodObject;
    onSubmit(values: any): any;
}

export interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    default?: any;
    interface: 'UInput' | 'USelect' | 'UTextarea' | 'UCheckbox' | 'URadio';
}