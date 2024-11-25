import { Injectable } from '@nestjs/common';
import { EstateRepository } from './repository/estate.repository';
import { CreateEstateDto, UpdateEstateDto } from './dto/estate.dto';
import { UserRepository } from '../user/repository/user.repository';
import { AgentRepository } from '../agent/repository/agent.repository';
import { BaseResponse } from 'src/common/response/base.response';
import { BusinessCode } from 'src/common/response/response.enum';
import { QueryDto } from 'src/common/query.dto';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto/feedback.dto';
import { FeedbackRepository } from './repository/feedback.repository';

@Injectable()
export class EstateService {
  constructor(
    private readonly estateRepository: EstateRepository,
    private readonly userRepository: UserRepository,
    private readonly agentRepository: AgentRepository,
    private readonly feedbackRepository: FeedbackRepository,
  ) {}

  async createEstate(clerkId: string, body: CreateEstateDto) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    const agent = await this.agentRepository.findOne({
      user: user._id,
    });
    
    await this.estateRepository.create({ ...body, agent: agent._id });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Estate Created Successfully',
    });
  }

  async getEstate(estateId: string) {
    const estate = await (await this.estateRepository.findById(estateId)).populate(
      'agent',
    );
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Estate Fetched Successfully',
      data: estate,
    });
  }

  async getEstates(query: QueryDto) {
    const estates = await this.estateRepository.findPaginated({ query });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Estates Fetched Successfully',
      data: estates,
    });
  }

  async updateEstate(estateId: string, body: UpdateEstateDto, clerkId: string) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    const agent = await this.agentRepository.findOne({
      user: user._id,
    });

    await this.estateRepository.findOneAndUpdate(
      {
        agent: agent._id,
        _id: estateId,
      },
      { ...body },
    );
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Estate Updated Successfully',
    });
  }

  async deleteEstate(estateId: string, clerkId: string) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    const agent = await this.agentRepository.findOne({
      user: user._id,
    });

    await this.estateRepository.softDelete({
      agent: agent._id,
      _id: estateId,
    });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Estate Updated Successfully',
    });
  }

  async createFeedback(
    clerkId: string,
    estateId: string,
    body: CreateFeedbackDto,
  ) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });
    const estate = await this.estateRepository.findById(estateId);

    await this.feedbackRepository.create({ user, estate, ...body });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'Feedback Created Successfully',
    });
  }

  async getFeedback(feedbackId: string) {
    const feedback = await this.feedbackRepository.findById(feedbackId);
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Feedback Fetched Successfully',
      data: feedback,
    });
  }

  async getFeedbacks(query: QueryDto) {
    const feedbacks = await this.feedbackRepository.findPaginated({ query });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Feedbacks Fetched Successfully',
      data: feedbacks,
    });
  }

  async updateFeedback(
    feedbackId: string,
    body: UpdateFeedbackDto,
    clerkId: string,
  ) {
    const user = await this.userRepository.findOne({ user_clerk_id: clerkId });

    await this.feedbackRepository.findOneAndUpdate(
      {
        user: user._id,
        _id: feedbackId,
      },
      { ...body },
    );
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Feedback Updated Successfully',
    });
  }
}
