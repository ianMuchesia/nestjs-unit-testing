import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create=>should create a new user by the given data', async()=>{
    //arrange
    const createUserDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@email.com'
    } as CreateUserDto;

    const user = {
      id: Date.now(),
      ...createUserDto,
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    //act
    const result = await controller.create(createUserDto);

    //assert
    expect(mockUsersService.create).toBeCalled();
    expect(mockUsersService.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  })

  it('findAll=>should return an array of users', async()=>{
    //arrange
    const user = {
      id: Date.now(),
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@email.com',
    } as User;
    const users = [user];
    jest.spyOn(mockUsersService, 'findAll').mockReturnValue(users);


    //act
    const result = await controller.findAll();

    //assert
    expect(mockUsersService.findAll).toBeCalled();
    expect(result).toEqual(users);

  });

  it('findOne=>should return a user by the given id', async()=>{
    //arrange
    const id = 1;
    const user = {
      id:Number(id),
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@email.com',
    } as User;

    jest.spyOn(mockUsersService, 'findOne').mockReturnValue(user);

    //act
    const result = await controller.findOne(id.toString());

    //assert
    expect(mockUsersService.findOne).toBeCalled();
    expect(mockUsersService.findOne).toBeCalledWith(id);
    expect(result).toEqual(user);
  }
);

it('update=>should update a user by the given id and data', async()=>{
  //arrange
  const id = 1;
  const updateUserDto = {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'johndoe@email.com',
  } as User;

  const user = {
    id:Number(id),
    ...updateUserDto,
  } as User;
  jest.spyOn(mockUsersService, 'update').mockReturnValue(user);


  //act

  const result = await controller.update(id.toString(), updateUserDto);

  //assert
  expect(mockUsersService.update).toBeCalled();
  expect(mockUsersService.update).toBeCalledWith(id, updateUserDto);
  expect(result).toEqual(user);
}

);

it('remove=>should remove a user by the given id', async()=>{
  //arrange
  const id = 1;
  const user = {
    id:Number(id),
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@email.com',
  } as User;

  jest.spyOn(mockUsersService, 'remove').mockReturnValue(user);

  //act
  const result = await controller.remove(id.toString());

  //assert
  expect(mockUsersService.remove).toBeCalled();
  expect(mockUsersService.remove).toBeCalledWith(id);
  expect(result).toEqual(user);
}

);



});
