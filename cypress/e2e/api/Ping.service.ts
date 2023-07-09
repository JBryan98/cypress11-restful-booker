import { default as api } from "./ApiHelper";

class PingService{
    private url = `${Cypress.env("URL")}/ping`

    public healthCheck(){
        api.get(this.url)
    }
}

export default new PingService();