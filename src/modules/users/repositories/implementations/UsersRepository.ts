import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const userExists = this.users.find((user) => user.id === id);

    if (!userExists) return undefined;

    return userExists;
  }

  findByEmail(email: string): User | undefined {
    const userExists = this.users.find((user) => user.email === email);

    if (!userExists) return undefined;

    return userExists;
  }

  turnAdmin(receivedUser: User): User {
    const userUpdated = Object.assign(receivedUser, {
      admin: true,
      updated_at: new Date(),
    });

    // Inserindo userUpdated no banco
    this.users = this.users.map((user) => {
      if (user.id === userUpdated.id) {
        Object.assign(user, userUpdated);
      }
      return user;
    });

    return userUpdated;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
