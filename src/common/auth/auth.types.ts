import { User } from 'src/api/user/user.entity';

export type SanitizedUser = Pick<User, 'username' | 'name' | 'role' | 'id'>;

export type JwtPayload = {
  username: string;
  id: number;
};
