import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseResponse } from '../../common/response/base.response';
import { BusinessCode } from '../../common/response/response.enum';
import { JwtService } from '@nestjs/jwt';
import { clerkClient } from '@clerk/clerk-sdk-node';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    // const clerk_user = await clerkClient.users.createUser({

    // });

    data.password = await bcrypt.hash(data.password, salt);

    await this.userRepository.checkUnique(data, 'email');

    const user = await this.userRepository.create(data);

    // console.log(clerk_user)
    // user.user_clerk_id = clerk_user.id;
    // await user.save();

    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'User created successfully',
    });
  }

  async login(data: CreateUserDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    await clerkClient.users.getUser(user.user_clerk_id);
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully login',
    });
  }
}
