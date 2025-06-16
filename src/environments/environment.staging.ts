export const environment = {
  production: false,
  staging: true,
  api: {
    baseUrl: 'https://api-staging.yourdomain.com',
    endpoints: {
      posts: 'https://jsonplaceholder.typicode.com/posts',
      getJson: '/get-json',
      getMultipleJson: '/get-multiple-json',
      getMultipleJsonV2: '/get-multiple-json-v-new',
      getViewData: '/get-view-data'
    }
  },
  cors: {
    allowedOrigins: ['https://staging.yourdomain.com', 'https://yourdomain-staging.netlify.app']
  }
};