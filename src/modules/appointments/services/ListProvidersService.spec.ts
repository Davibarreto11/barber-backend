import FakeUsersRepository from "../../users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe("ListProvidersService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  test("Should be able to list the providers", async () => {
    const userOne = await fakeUsersRepository.create({
      barber: false,
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    const userDoe = await fakeUsersRepository.create({
      barber: false,
      name: "Davi Artur",
      email: "artur@gmail.com",
      password: "123456",
    });

    const loggedUser = await fakeUsersRepository.create({
      barber: false,
      name: "Davi Artur",
      email: "vieira@gmail.com",
      password: "123456",
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userDoe]);
  });
});
