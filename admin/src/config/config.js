export const baseURL =
  process.env.WDS_SOCKET_PORT === '4002'
    ? 'http://localhost:4000'
    : 'http://174.138.4.15:4000'
