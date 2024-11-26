import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EstateService } from './estate.service';
import { CurrentUser } from 'src/common/current-user.decorator';
import { CreateEstateDto, UpdateEstateDto } from './dto/estate.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QueryDto } from 'src/common/query.dto';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto/feedback.dto';

@Controller('estates')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @ApiOperation({ description: 'Create New Estate' })
  @Post()
  async createEstate(
    @Body() body: CreateEstateDto,
    @CurrentUser() clerkId: string,
  ) {
    console.log(body)
    return await this.estateService.createEstate(clerkId, body);
  }

  @ApiOperation({ description: 'Get Estate By Id' })
  @Get('/:estateId')
  async getEstate(@Param('estateId') estateId: string) {
    return await this.estateService.getEstate(estateId);
  }

  @ApiOperation({ description: 'Get Estates' })
  @ApiQuery({
    name: 'page',
    description: 'Page Number',
    required: false,
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Number',
    required: false,
    schema: { default: 10 },
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Field to sort',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Direction To Sort ASC | DESC',
    required: false,
  })
  @ApiQuery({
    name: 'searchField',
    description: 'Field Of Estate to search',
    required: false,
  })
  @ApiQuery({
    name: 'searchValue',
    description: 'Search Input',
    required: false,
  })
  @Get()
  async getEstates(@Query() query: QueryDto) {
    return await this.estateService.getEstates(query);
  }

  @ApiOperation({ description: 'Get My Estates' })
  @ApiQuery({
    name: 'page',
    description: 'Page Number',
    required: false,
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Number',
    required: false,
    schema: { default: 10 },
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Field to sort',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Direction To Sort ASC | DESC',
    required: false,
  })
  @ApiQuery({
    name: 'searchField',
    description: 'Field Of Estate to search',
    required: false,
  })
  @ApiQuery({
    name: 'searchValue',
    description: 'Search Input',
    required: false,
  })
  @Get("/user/my-estates")
  async getMyEstates(@Query() query: QueryDto, @CurrentUser() clerkId: string) {
    return await this.estateService.getMyEstates(query, clerkId);
  }

  @ApiOperation({ description: 'Delete Estate' })
  @Delete('/:estateId')
  async deleteEstate(
    @Param('estateId') estateId: string,
    @CurrentUser() clerkId: string,
  ) {
    return await this.estateService.deleteEstate(estateId, clerkId);
  }

  @ApiOperation({ description: 'Update Estate' })
  @Patch('/:estateId')
  async updateEstate(
    @Param('estateId') estateId: string,
    @Body() body: UpdateEstateDto,
    @CurrentUser() clerkId: string,
  ) {
    return await this.estateService.updateEstate(estateId, body, clerkId);
  }

  @ApiOperation({ description: 'Create New Feedback' })
  @Post('/:estateId/feedbacks')
  async createFeedback(
    @Body() body: CreateFeedbackDto,
    @Param('estateId') estateId: string,
    @CurrentUser() clerkId: string,
  ) {
    return await this.estateService.createFeedback(clerkId, estateId, body);
  }

  @ApiOperation({ description: 'Get Feedback By Id' })
  @Get('/:estateId/feedbacks/:feedbackId')
  async getFeedback(@Param('feedbackId') feedbackId: string) {
    return await this.estateService.getFeedback(feedbackId);
  }

  @ApiOperation({ description: 'Get Feedbacks' })
  @ApiQuery({
    name: 'page',
    description: 'Page Number',
    required: false,
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Number',
    required: false,
    schema: { default: 10 },
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Field to sort',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Direction To Sort ASC | DESC',
    required: false,
  })
  @ApiQuery({
    name: 'searchField',
    description: 'Field Of Feedback to search',
    required: false,
  })
  @ApiQuery({
    name: 'searchValue',
    description: 'Search Input',
    required: false,
  })
  @Get('/:estateId/feedbacks')
  async getFeeedbacks(@Query() query: QueryDto) {
    return await this.estateService.getFeedbacks(query);
  }

  @ApiOperation({ description: 'Update Feedback' })
  @Patch('/:estateId/feedbacks/:feedbackId')
  async updateFeedback(
    @Param('feedbackId') feedbackId: string,
    @Body() body: UpdateFeedbackDto,
    @CurrentUser() clerkId: string,
  ) {
    return await this.estateService.updateFeedback(feedbackId, body, clerkId);
  }
}
