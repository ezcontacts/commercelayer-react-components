type ApplicationType = 'checkout' | 'cart' | 'my-account';
type ApplicationTypeProps = {
    applicationType: 'my-account';
    orderId?: string;
} | {
    applicationType: Omit<ApplicationType, 'my-account'>;
    orderId: string;
};
interface TArgs {
    accessToken: string;
    slug: string;
    domain: string;
}
type Props = TArgs & ApplicationTypeProps;
export declare function getApplicationLink({ orderId, accessToken, slug, domain, applicationType }: Props): string;
export {};
