import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, FilterQuery } from 'mongoose';
import { AbstractRepository } from '../../../common/db/abstract.repository';
import { Agent, AgentDocument } from '../model/agent.model';
import { QueryDto } from '../../../common/query.dto';

@Injectable()
export class AgentRepository extends AbstractRepository<Agent> {
  protected readonly logger = new Logger(AgentRepository.name);

  constructor(
    @InjectModel(Agent.name) agentModel: Model<AgentDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(agentModel, connection);
  }

  async findOne(filterQuery: FilterQuery<Agent>): Promise<Agent> {
    const document = await this.model
      .findOne(filterQuery, { is_deleted: false })
      .populate({
        path: 'user',
        select: "_id name email createdAt updatedAt user_clerk_id"
      })
    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  
  async findPaginated({
    query,
    filterQuery,
  }: {
    query: QueryDto;
    filterQuery?: FilterQuery<Agent>;
  }): Promise<any> {
    const { limit, page, searchField, searchValue, sortDirection, sortField } =
      query;
    const skip = (page - 1) * limit;

    const filter = { is_deleted: false };

    // Construct the sorting object
    const sortFilter: Record<string, 1 | -1> = sortField
      ? { [sortField]: sortDirection === 'DESC' ? -1 : 1 }
      : { created_at: 1 };

    // If a search query is provided, apply text search or regex search
    if (searchField && searchValue) {
      filter[searchField] = { $regex: searchValue, $options: 'i' }; // Case-insensitive regex search
    }

    // Find the documents with pagination, filtering, and sorting
    const items = await this.model
      .find({ ...filter, ...filterQuery })
      .populate({
        path: 'user',
        select: "_id name email createdAt updatedAt user_clerk_id"
      })
      .sort(sortFilter)
      .skip(skip)
      .limit(limit)
      .exec();

    // Count the total number of documents for pagination metadata
    const totalItems = await this.model
      .countDocuments({ ...filter, ...filterQuery })
      .exec();

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      totalItems,
      totalPages,
      currentPage: page,
      hasPreviousPage,
      hasNextPage,
      items,
    };
  }
}
