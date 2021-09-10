import { IOptions, IFormState, IUserData } from "../models/models";


export const makeApiCall = (options: IOptions, requestData?: IFormState | IUserData | null) => {
    let url = 'http://localhost:3001/';
    url = url + options.route;
    return fetch(url, {
        method: options.method,
        headers: {
            'content-type': 'application/json',
        },
        body: options.method !== 'GET' ? JSON.stringify(requestData) : undefined,
    });
}


