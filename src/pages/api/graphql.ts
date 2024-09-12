import { createYoga } from 'graphql-yoga';
import { schema } from '../../graphql/schema';

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});
