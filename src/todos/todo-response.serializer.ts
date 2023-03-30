import { Todo } from './entities/todo.entity';

const todoResponseSerializer = (todo: Todo) => {
  delete todo.createdAt;
  delete todo.deletedAt;
  delete todo.updatedAt;
};

export default todoResponseSerializer;
