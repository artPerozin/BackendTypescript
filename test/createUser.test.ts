import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreateUser from "../source/useCases/createUser/CreateUser";

let repositoryFactory: RepositoryFactoryInterface;

beforeEach(function () {
    repositoryFactory = new MemoryRepositoryFactory();
});

test("Deve criar um usuário", async function () {
    const createUser = new CreateUser(repositoryFactory);
    const input = {
        name: 'John',
        email: 'john.doe@konvex.com.br',
        password: 'senha'
    }
    const output = await createUser.execute(input);
    expect(output.accessToken).toBeTruthy();
});

test("Não deve criar um usuário com senha inferior a seis caracteres", async function () {
    const createUser = new CreateUser(repositoryFactory);
    const input = {
        name: 'John',
        email: 'john.doe@konvex.com.br',
        password: 'senha'
    }
    await expect(createUser.execute(input)).rejects.toThrow(new Error("Invalid password"));
});

test("Deve verificar se há registros no repositório", async function () {
    const userRepository = repositoryFactory.createUserRepository();
    expect(await userRepository.getAll()).toHaveLength(0);
    const createUser = new CreateUser(repositoryFactory);
    const input = {
        name: 'John',
        email: 'john.doe@konvex.com.br',
        password: 'senha'
    }
    await createUser.execute(input);
    expect(await userRepository.getAll()).toHaveLength(1);
});