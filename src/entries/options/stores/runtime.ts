/**
 * 此处放置一些其他数据，这些数据一般具有以下特征：
 * 1. 不需要persist
 * 2. 不需要跨tab共享的
 * 3. 可以在不同component中共享的
 */

import { defineStore } from "pinia";
import type { ESearchResultParseStatus, ITorrent, TSiteID } from "@ptd/site";
import { TSolutionID } from "@/storage.ts";

export type TSearchSolutionKey = `${TSiteID}|$|${TSolutionID}`;

export interface ISearchResultTorrent extends ITorrent {
  uniqueId: string; // 每个种子的uniqueId，由 `${site}-${id}` 组成
  solutionId: TSolutionID; // 对应搜索方案的id
  solutionKey: TSearchSolutionKey; // 对应搜索方案的key，由 `${site}-${solutionId}` 组成
}

interface ISearchData {
  isSearching: boolean; // 是否正在搜索
  // 该搜索相关时间情况
  startAt: number;
  costTime: number; // 搜索耗时

  // 该搜索相关的搜索条件
  searchKey: string;
  searchPlanKey: string;

  // 该搜索相关的搜索结果
  searchPlanStatus: Record<TSearchSolutionKey, ESearchResultParseStatus>;
  searchResult: ISearchResultTorrent[];
}

export const initialSearchData: () => ISearchData = () => ({
  isSearching: false,
  startAt: 0,
  costTime: 0,
  searchKey: "",
  searchPlanKey: "default",
  searchPlanStatus: {},
  searchResult: [],
});

export const useRuntimeStore = defineStore("runtime", {
  persist: true,
  persistWebExt: false,
  state: () => ({
    search: initialSearchData(),
  }),

  actions: {
    resetSearchData() {
      this.search = initialSearchData();
    },
  },
});
