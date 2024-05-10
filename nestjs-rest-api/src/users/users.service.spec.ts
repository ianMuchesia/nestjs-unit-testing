import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { first, last } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


const mockUserRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        UsersService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });


  //While writing tests always follow the Arrange-action-assert pattern
  //This makes your tests more readable and easier to maintain
  //Arrange: setup the object to be tested
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create=>Should create a new user and return its data', async() => {
    //arrange
    const createUserDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@email.com',
    } as CreateUserDto;

    const user = {
      id: Date.now(),
      ...createUserDto,
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    //act
    const result = await service.create(createUserDto);

    //assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll=> should return an array of user',async () => {
    //arrange
    const user = {
      id: Date.now(),
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };
    const users = [user];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toBeCalled();
  });
  it('findOne', () => {});
  it('update', () => {});
  it('remove', () => {});
});
