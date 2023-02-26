import { User } from 'src/api/users/user.entity';

export type SanitizedUser = Pick<User, 'username' | 'name' | 'role' | 'id'>;

export type JwtPayload = {
  username: string;
  id: number;
};
