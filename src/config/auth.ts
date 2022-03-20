import { SECRET, EXPIRES_IN } from '@presentation/utils/environment';

interface IAuthConfig {
  secret: string;
  expires_in: string;
}

export default {
  secret: SECRET,
  expires_in: EXPIRES_IN,
} as IAuthConfig;
