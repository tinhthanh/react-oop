import { EntityModel, ResponseBase } from "./base.type";
import { LoadingService } from '../../../../services/loadingService';
import Dexie from 'dexie';
import { uuid } from '../../../../utils/utils';
import { inject } from "../../../../utils/inject";
import axiosInstance from "./axios.interceptor";

export abstract class BaseService<T extends EntityModel> {
  public loadingService = inject(LoadingService); 
  private db: Dexie = new Dexie('VgBD');
  private tableName: string;
  abstract fields(): { [K in keyof T]: keyof T } ;
    constructor(tableName: string) {
      console.warn('Khởi tạo' , tableName);
      this.tableName = tableName;
      if (!this.db.tables.some(table => table.name === tableName)) {
        this.db.version(1).stores({
          [tableName]: Object.keys(this.fields()).join(",")
        });
      }
      this.db.open().catch(error => {
        console.error("Failed to open database:", error);
      });
    }
    async search<F>(filter: Partial<F> & Partial<T> & { pageSize: number; pageNumber: number }): Promise<ResponseBase<T>> {
      const { pageSize, pageNumber, ...query } = filter;
      console.log(query);
      const allItems = await this.db.table(this.tableName).toArray();
  
      const totalElements = allItems.length;
      const totalPages = Math.ceil(totalElements / pageSize);
      const elements = allItems.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  
      const response: ResponseBase<T> = {
        successful: true,
        data: {
          page: pageNumber,
          size: pageSize,
          totalElements: totalElements,
          totalPages: totalPages,
          elements: elements,
          hasPrevious: pageNumber > 1,
          hasMore: pageNumber < totalPages,
        },
      };
  
      return response;
    }
    async get(id: string): Promise<T | undefined> {
      return await this.db.table(this.tableName).get(id);
    }
    async add(data: T): Promise<void> {
      axiosInstance.post(`/public/api/dynamic/table/${this.tableName}/insert`, data).then( rs => {
        console.log(rs);
      });
      return new Promise( (resolve) => {
        const newModel = {...data,id: uuid()};
        this.db.table(this.tableName).add(newModel).then(( rs => {
            console.log(rs);
          resolve();
        }));
      });
    }
    async edit(id: string, data: Partial<T>): Promise<number> {
      return await this.db.table(this.tableName).update(id, data);
    }
    async delete(id: string): Promise<void> {
      return await this.db.table(this.tableName).delete(id);
    }
    async getAll(): Promise<T[]> {
      return await this.db.table(this.tableName).toArray();
    }
}