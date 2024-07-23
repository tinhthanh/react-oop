import { EntityModel, ResponseBase } from "./base.type";
import { LoadingService } from "../../../../services/loadingService";
import Dexie from "dexie";
import { uuid } from "../../../../utils/utils";
import { inject } from "../../../../utils/inject";
import axiosInstance from "./axios.interceptor";

export abstract class BaseService<T extends EntityModel> {
  public loadingService = inject(LoadingService);
  private db: Dexie = new Dexie("VgBD");
  private tableName: string;
  abstract fields(): { [K in keyof T]: keyof T };
  constructor(tableName: string) {
    this.tableName = tableName;
    if (!this.db.tables.some((table) => table.name === tableName)) {
      this.db.version(1).stores({
        [tableName]: Object.keys(this.fields()).join(","),
      });
    }
    this.db.open().catch((error) => {
      console.error("Failed to open database:", error);
    });
  }
  async search<F>(
    filter: Partial<F> & Partial<T> & { pageSize: number; pageNumber: number }
  ): Promise<ResponseBase<T>> {
    const { pageSize, pageNumber, ...query } = filter;
    console.log(query);
    const local = await this.db.table(this.tableName).toArray();
    const maxSeqNo = getMaxSeqNo(local);
    const remoteList =  await this.getBySeqNo(maxSeqNo);
    const allItems = megere(local, remoteList); 
    this.cache().setAll(remoteList);
    const totalElements = allItems.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const elements = allItems.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
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
  private async getBySeqNo(seqNo: number):  Promise<T[]> {
    return new Promise((resolve, reject) => { 
      axiosInstance.get(`/public/api/dynamic/table/${this.tableName}/fetch-by-seq-no?seqNo=${seqNo}&size=1000000`).then( rs => {
        if(rs.status === 200) {
          resolve(rs.data?.data || []);
        } else { 
          resolve([]);
        }
       }).catch(reject);
    });
  }
  async get(id: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => { 
      axiosInstance.get(`/public/api/dynamic/table/${this.tableName}/${id}`).then( rs => {
        if(rs.status === 200) {
          resolve(rs.data);
        } else { 
           reject(); 
        }
       });
    });
  }
  cache() {
    return {
      get: (id: string): Promise<T | undefined> => { 
       return new Promise((resolve, reject) => {
          this.db.table(this.tableName).get(id).then( (item) => {
            if(item) {
               resolve(item); // return cache
            } else {
              this.get(id).then( (it) => { // return from server
                  resolve(it);
              }).catch(reject);
            }
          });
       });
      },
      getAll: () : Promise<T[]> => {
        return this.db.table(this.tableName).toArray();
      },
      set: (data: T): Promise<void>  => {
        return new Promise((resolve, reject) => {
          this.db.table<T>(this.tableName).delete(data?.id || '').finally(
            () => this.db.table<T>(this.tableName).add({...data , sync: false }).then(()=> {
               resolve();
            }).catch(reject)
            );
         });
      },
      setAll: (list: T[]) => {
        this.db.table(this.tableName).clear().then( ()=> {
          this.db.table(this.tableName).bulkAdd(list);
        });
      }
    };
  }

  async add(data: T): Promise<void> {
    const newModel = { ...data, id: data.id || uuid(), seqNo: new Date().getTime() };
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/public/api/dynamic/table/${this.tableName}/insert`, newModel)
        .then((rs) => {
          if (rs.status === 201) {
            this.cache().set(newModel)
              .then(() => {
                resolve();
              });
          } else {
            reject();
          }
        }).catch(reject);
    });
  }
  async edit(data: T): Promise<void> {
     return this.add(data);
  }
  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => { 
      this.get(id).then( rs => {
        if(rs) {
          this.edit({...rs ,deleted: true, seqNo: new Date().getTime()}).then( 
             () => {
              resolve();
             }
          ).catch(reject);
        }
      }).catch(reject);
    });
  }
}

// get max seqNo of list
export const getMaxSeqNo = <T extends EntityModel>(list: T[]) => list.reduce((max, item) => {
  if(item.sync === false) return max;
  const seqNo = Number(item.seqNo || 0);
  return seqNo > max ? seqNo : max;
}, 0);
export const megere =  <T extends EntityModel>(local: T[] ,remoteList:  T[] ): T[] => {
  const mapRemoteList: { [key: string]: T } = local.concat(remoteList).reduce(
    (pre: { [key: string]: T }  , cur) => {
      if (pre[cur.id ||'']) {
        if ((pre[cur?.id || '']?.seqNo || 0) < (cur?.seqNo || 0)) {
          pre[cur?.id || ''] = cur;
        }
      } else {
        pre[cur?.id || ''] = cur;
      }
      return pre;
    },
    {}
  );
  return Object.values(mapRemoteList);
};