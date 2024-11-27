import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, FilterQuery } from 'mongoose';
import { AbstractRepository } from 'src/common/db/abstract.repository';
import { Estate } from '../model/estate.model';
import { QueryDto } from 'src/common/query.dto';

@Injectable()
export class EstateRepository extends AbstractRepository<Estate> {
  protected readonly logger = new Logger(EstateRepository.name);

  constructor(
    @InjectModel(Estate.name) estateModel: Model<Estate>,
    @InjectConnection() connection: Connection,
  ) {
    super(estateModel, connection);
  }

  async findById(id: string): Promise<Estate> {
    const document = await this.model
      .findOne({ _id: id, is_deleted: false })
      .populate({
        path: 'agent'
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
    filterQuery?: FilterQuery<Estate>;
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
        path: 'agent'
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
