export const environment = {
  production: true,
  dataSource: 'static' as 'server' | 'static', // Production uses static by default
  api: {
    baseUrl: 'http://localhost:8000',
    endpoints: {
      posts: 'https://jsonplaceholder.typicode.com/posts',
      getJson: '/get-json',
      getMultipleJson: '/get-multiple-json',
      getMultipleJsonV2: '/get-multiple-json-v-new',
      getViewData: '/get-view-data'
    }
  },
  cors: {
    allowedOrigins: ['https://yourdomain.com', 'https://www.yourdomain.com']
  }
};
