import { z } from 'zod';
import type { FormField } from './Form';
import type Form from './Form'

export const PermitApplicationSchema = z.object({
        applicant_name: z.string().min(1, 'Application name is required'),
        permit_type: z.string().min(1, 'Permit type is required'),
        applicant_email: z.string().email('Invalid email address'),
    });

export default class PermitApplicationForm implements Form {
    fields: FormField[];



    constructor() {
        this.fields = [
            {
                name: 'applicant_name',
                label: 'اسم مقدم الطلب',
                type: 'text',
                interface: 'UInput',
                default: '',
                placeholder: 'محمد',
            },
            {
                name: 'permit_type',
                label: 'نوع التصريح',
                type: 'text',
                interface: 'UInput',
                default: '',
                placeholder: 'تصريح بناء',
            },
            {
                name: 'applicant_email',
                label: 'البريد الإلكتروني لمقدم الطلب',
                type: 'email',
                interface: 'UInput',
                default: '',
                placeholder: 'example@example.com',
            },
        ];
    }

    schema = PermitApplicationSchema;

    onSubmit(values: any) {
        const result = this.schema.safeParse(values);
        if (!result.success) {
            throw new Error('Validation failed');
        }
       
        const createOne = fetch('/api/permit-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result.data),
        });
        return result.data;
    }
}