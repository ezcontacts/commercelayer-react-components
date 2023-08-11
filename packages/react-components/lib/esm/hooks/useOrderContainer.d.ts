import { type Order } from '@commercelayer/sdk';
export declare function useOrderContainer(): {
    order?: Order;
    reloadOrder: () => Promise<Order | undefined>;
};
export default useOrderContainer;
