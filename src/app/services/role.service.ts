import AppDataSource from '@config/mongoose';
import Service from '@libs/service';
import Response from '@libs/response';
import Role from '@models/role.schema';
// import User from '@models/user.schema';
// import Post from '@models/post.schema';
import SearchEngine from '@libs/meili.search';
import { ObjectId } from 'mongodb';
import moment from 'moment';

export default class RoleService extends Service {
  private roleModel: any;
  private userModel: any;
  private postModel: any;
  private searchEngine: any;
  constructor() {
    super();
    this.searchEngine = new SearchEngine()
    this.roleModel = Role;
    // this.userModel = User;
    // this.postModel = Post;
  }

  async count(): Promise<Response<any>> {
    try {
      const result = await this.roleModel.countDocuments();
      if (!result) {
        return new Response<any>(true, 200, 'Record not available', result);
      }
      return new Response<any>(true, 200, 'Count operation successful', result);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async list(): Promise<Response<any>> {
    try {
      const result = await this.roleModel.find();
      if (!result) {
        return new Response<any>(true, 200, 'Record not available', result);
      }
      return new Response<any>(true, 200, 'Read operation successful', result);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async retrieve(pid: string): Promise<Response<any>> {
    try {
      const isValidObjectId = ObjectId.isValid(pid);
      if (!isValidObjectId) {
        return new Response<any>(false, 400, 'Invalid ObjectId', undefined);
      }
      const record = await this.roleModel.findById(pid);
      if (!record) {
        return new Response<any>(true, 200, 'Record not available', record);
      }
      return new Response<any>(true, 200, 'Read operation successful', record);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async retrieveByRole(name: string): Promise<any> {
    try {
      const records = await this.roleModel.findOne({ name: name });
      return records;
    } catch (error: any) {
      return error;
    }
  }

  async create(data: any): Promise<Response<any>> {
    try {
      const role = new Role();
      role.name = data.name;
      role.description =data.description;
      role.status= data.status;
      role.createdAt=moment().toDate();
      role.updatedAt=moment().toDate();
      await this.searchEngine.addDocuments('role', role);
      const result = await role.save();
      return new Response<any>(true, 201, 'Insert operation successful',result);
      
    } catch (error:any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async update(pid: string, data: any): Promise<Response<any>> {
    try {
      const isValidObjectId = ObjectId.isValid(pid);
      if (!isValidObjectId) {
        return new Response<any>(false, 400, 'Invalid ObjectId', undefined);
      }
      const role = await this.roleModel.findById(pid);
      if (!role) {
        return new Response<any>(true, 200, 'Record not available', role);
      }
      if (data.name) {
        role.name = data.name;
      }
      if (data.description) {
        role.description = data.description;
      }
      if (data.status) {
        role.status = data.status;
      }
      await this.searchEngine.updateIndex('role', role);
      const result = await role.save();
      
      return new Response<any>(true, 200, 'Update operation successful', result);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async delete(pid: string): Promise<Response<any>> {
    try {
      const isValidObjectId = ObjectId.isValid(pid);
      if (!isValidObjectId) {
        return new Response<any>(false, 400, 'Invalid ObjectId', undefined);
      }
      const role = await this.roleModel.findById(pid);
      if (!role) {
        return new Response<any>(true, 200, 'Record not available');
      }
      role.deletedAt = moment().toDate();
      await this.searchEngine.deleteDocument('role', pid);
      const result = await role.save();
      return new Response<any>(true, 200, 'Delete operation successful', result);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }

  async datatable(data: any): Promise<Response<any>> {
    try {
      let { page, limit, search, sort } = data;
      let errorMessage = '';

      if (page !== undefined && limit !== undefined) {
        if (isNaN(page) || !Number.isInteger(Number(page)) || isNaN(limit) || !Number.isInteger(Number(limit))) {
          errorMessage = "Both 'page' and 'limit' must be integers.";
        }
      } else if (page !== undefined) {
        if (isNaN(page) || !Number.isInteger(Number(page))) {
          errorMessage = "'page' must be an integer.";
        }
      } else if (limit !== undefined) {
        if (isNaN(limit) || !Number.isInteger(Number(limit))) {
          errorMessage = "'limit' must be an integer.";
        }
      }

      if (errorMessage) {
        return new Response<any>(false, 400, errorMessage);
      }

      let searchQuery = {};
      if (search !== undefined) {
        searchQuery = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        };
      }

      let sortQuery = {};
      if (sort !== undefined) {
        const sortParams = sort.split(':');
        if (sortParams.length === 2) {
          const [column, order] = sortParams;
          sortQuery = { [column]: order === 'desc' ? -1 : 1 };
        }
      }

      page = page === undefined ? 1 : parseInt(page);
      limit = limit === undefined ? 10 : parseInt(limit);
      const skip = (page - 1) * limit;
      const [records, totalCount] = await Promise.all([
        this.roleModel.find()
          .select({ 
            "name": 1,
            "description":1,
            "status":1,
           "_id": 0
          })
          .where(searchQuery)
          .sort(sortQuery)
          .skip(skip)
          .limit(limit),
        this.roleModel.countDocuments(searchQuery),
      ]);
      console.log(records, totalCount)
      if (records.length === 0) {
        return new Response<any>(true, 200, 'No records available', {});
      }

      const totalPages = Math.ceil(totalCount / limit);
      const currentPage = page;
      const output = {
        records: records,
        totalPages: totalPages !== null ? totalPages : 0,
        currentPage: currentPage !== null ? currentPage : 0,
        filterCount: records.length,
        totalCount: totalCount,
      };
      return new Response<any>(true, 200, 'Read operation successful', output);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Internal Server Error', undefined, undefined, error.message);
    }
  }
  async searchRoles(query: any): Promise<Response<any>> {
    try {
      const searchOptions = {
        filters: `name:${query}*`, // Specify the filter to search in the "name" column with a partial match
        attributesToRetrieve: ['name'], // Specify the column(s) to retrieve in the search results
      };
      const result = await this.searchEngine.search('role', query, searchOptions);
      return new Response<any>(true, 200, 'Search engine operation successful', result);
    } catch (error: any) {
      return new Response<any>(false, 500, 'Search engine server error', undefined, undefined, error.message);
    }
  }
}
