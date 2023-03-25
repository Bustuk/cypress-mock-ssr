export type MockRequest = {
  hostname: string,
  method: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'PATCH' | 'DELETE' | 'MERGE' | 'OPTIONS',
  path: string,
  statusCode: number,
  body: any
}


