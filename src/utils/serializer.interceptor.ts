import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from 'src/todos/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import userResponseSerializer from 'src/users/user-response.serializer';
import todoResponseSerializer from '../todos/todo-response.serializer';

const isObject = (value) => typeof value === 'object';

const clearServiceFields = (value) => {
  if (value === undefined || value === null) {
    return value;
  }

  if (value?.constructor.name === 'User') {
    userResponseSerializer(value as User);
  }

  if (value?.constructor.name === 'Todo') {
    todoResponseSerializer(value as Todo);
  }

  if (isObject(value)) {
    Object.keys(value).forEach((key) => {
      if (isObject(value[key])) {
        value[key] = clearServiceFields(value[key]);
      }
    });
  }

  return value;
};

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(
        map((data) =>
          Array.isArray(data)
            ? data.map(clearServiceFields)
            : clearServiceFields(data),
        ),
      );
  }
}
