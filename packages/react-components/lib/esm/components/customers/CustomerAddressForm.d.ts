import { type ReactNode } from 'react';
interface Props extends Omit<JSX.IntrinsicElements['form'], 'onSubmit'> {
    children: ReactNode;
    reset?: boolean;
    errorClassName?: string;
}
export declare function CustomerAddressForm(props: Props): JSX.Element;
export default CustomerAddressForm;
