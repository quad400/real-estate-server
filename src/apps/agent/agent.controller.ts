import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CurrentUser } from 'src/common/current-user.decorator';
import { CreateAgentDto } from './dto/create-agent.dto';
import { QueryDto } from 'src/common/query.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async createAgent(
    @Body() body: CreateAgentDto,
    @CurrentUser() clerkId: string,
  ) {
    return await this.agentService.createAgent(clerkId, body);
  }

  @Get('/:agentId')
  async getAgent(@Param('agentId') agentId: string) {
    return await this.agentService.getAgent(agentId);
  }

  @ApiOperation({ description: 'Get Agents' })
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
    description: 'Field Of Agent to search',
    required: false,
  })
  @ApiQuery({
    name: 'searchValue',
    description: 'Search Input',
    required: false,
  })
  @Get()
  async getAgents(@Query() query: QueryDto) {
    return await this.agentService.getAgents(query);
  }

}
