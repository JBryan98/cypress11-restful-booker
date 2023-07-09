class ApiHelper {
  private response: Cypress.Response<any>;

  public getResponse(): Cypress.Response<any> {
    return this.response;
  }

  public setResponse(response: Cypress.Response<any>): void {
    this.response = response;
  }

  public get(url: string, queryParams?: object): void {
    cy.request({
      method: "GET",
      url: url,
      headers: {
        "Content-type": "application/json",
      },
      qs: queryParams,
    }).then((response) => this.setResponse(response));
  }

  public post(url: string, body: Object): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "POST",
      url: url,
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    }).then((response) => this.setResponse(response));
  }

  public put(url: string, body: Object, token: string): void {
    cy.request({
      method: "PUT",
      url: url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: body,
    }).then((response) => this.setResponse(response));
  }

  public patch(url: string, body: Object, token: string): void {
    cy.request({
      method: "PATCH",
      url: url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: body,
    }).then((response) => this.setResponse(response));
  }

  public delete(url: string, token: string): void {
    cy.request({
      method: "DELETE",
      url: url,
      headers: {
        "Content-type": "application/json",
        Cookie: `token=${token}`,
      },
    }).then((response) => this.setResponse(response));
  }
}

export default new ApiHelper();
