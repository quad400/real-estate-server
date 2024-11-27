import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { BaseResponse } from '../../common/response/base.response';
import { BusinessCode } from '../../common/response/response.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(clerkId: string) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User Fetched Successfully',
      data: user,
    });
  }
}
