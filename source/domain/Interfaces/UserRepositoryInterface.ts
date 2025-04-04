import User from "../Entity/User";

export default interface UserRepositoryInterface {
    create(user: User): Promise<User | null>;
    getAll(): Promise<User[]>;
    // fingById(id: string): Promise<User | null>;
    // update(user: User): Promise<User>;
    // delete(id: string): Promise<void>;
}