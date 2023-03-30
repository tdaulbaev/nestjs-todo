import { User } from './entities/user.entity';

const userResponseSerializer = (user: User) => {
  delete user.password;
  delete user.createdAt;
  delete user.deletedAt;
  delete user.updatedAt;
};

export default userResponseSerializer;
