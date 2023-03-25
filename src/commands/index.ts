declare global {
  namespace Cypress {
    interface Chainable {
    /** 
      * Command to mock request on server side
     * @example
     * cy.mockSSR({
     *   method: 'POST',
     *   path: '/api/goliath/list',
     *   statusCode: 200,
     *   body: apiGoliathList,
     * });
     */
    mockSSR(payload: Omit<MockRequest, 'hostname'>): void,
    /**
     * Command to clear all server-side mocks
     * @example
     * After(() => {
     *  cy.clearSSRMocks();
     * });
     */
    clearSSRMocks(): void
    }
  }
}

import { MockRequest} from '../typings/mockReq';

Cypress.Commands.add('mockSSR', (payload: Omit<MockRequest, 'hostname'>) => {
  cy.request(
    'POST',
    '/__cypress_server_mock',
    { hostname: Cypress.env('SSR_BASE_URL'), ...payload },
  );
});

Cypress.Commands.add('clearSSRMocks', () => {
  cy.request('/__cypress_clear_mocks');
});
