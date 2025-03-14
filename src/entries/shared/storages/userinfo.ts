import type { IUserInfo, TSiteID } from "@ptd/site";

export interface IStoredUserInfo extends IUserInfo {}

export interface IUserInfoStorageSchema {
  [key: TSiteID]: {
    [key: `${string}-${string}-${string}`]: IStoredUserInfo;
  };
}
