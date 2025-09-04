import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string | undefined;
    if (searchTerm) {
      const orConditions = searchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' }
      }));
      this.modelQuery = this.modelQuery.where({ $or: orConditions });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);
    ['categories'].forEach(field => {
      if (!queryObj[field]) delete queryObj[field];
    });

    this.modelQuery = this.modelQuery.where(queryObj);
    return this;
  }

  sort() {
    const sortStr = (this.query?.sort as string)?.split(',').join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields(defaultFields?: string) {
    const queryFields = this.query?.fields as string | undefined;
    const fields = queryFields ? queryFields.split(',').join(' ') : defaultFields ?? '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);
    return { page, limit, total, totalPage };
  }
}

export default QueryBuilder;