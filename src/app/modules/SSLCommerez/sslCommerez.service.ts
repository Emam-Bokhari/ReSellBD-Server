/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import { HttpError } from '../../errors/HttpError';

const store_id = config.ssl.store_id as string;
const store_pass = config.ssl.store_pass as string;
const is_live = false; // true for live false for sandbox

const initiatePayment = async (paymentData: any) => {
    const sslcz = new SSLCommerzPayment(store_id, store_pass, is_live);

    try {
        const apiResponse = await sslcz.init({
            ...paymentData,
        });
        return apiResponse.GatewayPageURL;
    } catch (error: any) {
        throw new HttpError(400, 'Failed to initiate payment');
    }
};

export const SSLCommerzService = {
    initiatePayment,
};
