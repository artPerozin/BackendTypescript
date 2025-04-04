import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import CreateUser from "../../useCases/createUser/CreateUser";
import CreateUserInput from "../../useCases/createUser/CreateUserInput";
import CreateUserOutput from "../../useCases/createUser/CreateUserOutput";

export default class UserController {

    constructor(protected repositoryFactory: RepositoryFactoryInterface) {
    }

    async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
        const createUser = new CreateUser(this.repositoryFactory);
        return await createUser.execute(input);
    }

}