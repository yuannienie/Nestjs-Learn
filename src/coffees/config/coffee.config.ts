import { registerAs } from '@nestjs/config';

// configuration and namespaces
export default registerAs('coffee', () => ({
  foo: 'bar',
}));
