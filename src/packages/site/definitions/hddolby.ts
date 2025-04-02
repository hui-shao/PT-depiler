import { ISiteMetadata } from "@ptd/site";
import {
  CategoryInclbookmarked,
  CategoryIncldead,
  CategorySpstate,
  SchemaMetadata,
} from "@ptd/site/schemas/NexusPHP.ts";
import {
  allCustomTags,
  allTagSelectors,
  selectorSearchProgress,
  selectorSearchStatus,
} from "@ptd/site/definitions/hdhome.ts";

export const siteMetadata: ISiteMetadata = {
  ...SchemaMetadata,

  version: 2,
  id: "hddolby",
  name: "HD Dolby",
  description: "高清杜比",
  tags: ["影视", "综合"],
  collaborator: ["iceyuamao0510", "tongyifan"],

  type: "private",
  schema: "NexusPHP",

  urls: ["https://www.hddolby.com/"],

  category: [
    {
      name: "类别",
      key: "cat",
      options: [
        { value: 401, name: "Movies电影" },
        { value: 402, name: "TV Series电视剧" },
        { value: 404, name: "Documentaries纪录片" },
        { value: 405, name: "Animations动漫" },
        { value: 403, name: "TV Shows综艺" },
        { value: 406, name: "Music Videos" },
        { value: 407, name: "Sports体育" },
        { value: 408, name: "HQ Audio音乐" },
        { value: 410, name: "Games游戏" },
        { value: 411, name: "Study学习" },
        { value: 409, name: "Others其他" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "媒介",
      key: "medium",
      options: [
        { value: 1, name: "UHD" },
        { value: 2, name: "Blu-ray" },
        { value: 3, name: "Remux" },
        { value: 10, name: "Encode" },
        { value: 6, name: "WEB-DL" },
        { value: 12, name: "FEED" },
        { value: 5, name: "HDTV" },
        { value: 7, name: "Webrip" },
        { value: 4, name: "HD DVD" },
        { value: 8, name: "DVD" },
        { value: 9, name: "CD" },
        { value: 11, name: "Other" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "编码",
      key: "codec",
      options: [
        { value: 1, name: "H.264/AVC" },
        { value: 2, name: "H.265/HEVC" },
        { value: 13, name: "H.266/VVC" },
        { value: 11, name: "AV1" },
        { value: 12, name: "VP9" },
        { value: 14, name: "AVS3" },
        { value: 15, name: "AVS+" },
        { value: 16, name: "AVS2" },
        { value: 5, name: "VC-1" },
        { value: 6, name: "MPEG-2" },
        { value: 7, name: "Other" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "音频编码",
      key: "audiocodec",
      options: [
        { value: 1, name: "DTS-HD MA" },
        { value: 2, name: "TrueHD" },
        { value: 15, name: "DTS-X" },
        { value: 3, name: "LPCM" },
        { value: 4, name: "DTS" },
        { value: 5, name: "DD/AC3" },
        { value: 14, name: "DDP/EAC3" },
        { value: 6, name: "AAC" },
        { value: 13, name: "Opus" },
        { value: 7, name: "FLAC" },
        { value: 8, name: "APE" },
        { value: 9, name: "WAV" },
        { value: 10, name: "MP3" },
        { value: 11, name: "M4A" },
        { value: 16, name: "AV3A" },
        { value: 17, name: "AVSA" },
        { value: 18, name: "MPEG" },
        { value: 12, name: "Other" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "分辨率",
      key: "standard",
      options: [
        { value: 6, name: "4320/8K" },
        { value: 1, name: "2160p/4K" },
        { value: 2, name: "1080p" },
        { value: 3, name: "1080i" },
        { value: 4, name: "720p" },
        { value: 5, name: "Others" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "制作组",
      key: "team",
      options: [
        { value: 1, name: "Dream" },
        { value: 10, name: "DBTV" },
        { value: 12, name: "QHstudIo" },
        { value: 13, name: "CornerMV" },
        { value: 14, name: "Telesto" },
        { value: 2, name: "MTeam" },
        { value: 4, name: "WiKi" },
        { value: 7, name: "FRDS" },
        { value: 9, name: "HDo" },
        { value: 11, name: "beAst" },
        { value: 5, name: "CHD" },
        { value: 6, name: "CMCT" },
        { value: 3, name: "PTHome" },
        { value: 8, name: "Other" },
      ],
    },
    CategoryIncldead,
    CategorySpstate,
    CategoryInclbookmarked,
    {
      name: "标签（且模式）",
      key: "tags_and",
      notes: "请勿与标签（或模式）同时使用！！",
      options: allCustomTags,
      cross: { mode: "comma", key: "tags" },
    },
    {
      name: "标签（或模式）",
      key: "tags_or",
      notes: "请勿与标签（且模式）同时使用！！",
      options: allCustomTags,
      cross: { mode: "custom" },
      // 因为 { mode: "comma" } 不支持额外的参数 &tags_mode=OR，所以这里使用 generateRequestConfig
      generateRequestConfig: (selectedTags) => {
        const tags = (selectedTags as string[]).join(",");
        return {
          requestConfig: { params: { tags, tags_mode: "OR" } },
        };
      },
    },
  ],

  search: {
    ...SchemaMetadata.search!,
    selectors: {
      ...SchemaMetadata.search!.selectors!,
      subTitle: {
        selector: ["td:has(a[href*='hit'][title]) > span:last"],
      },
      progress: selectorSearchProgress,
      status: selectorSearchStatus,
      tags: [...SchemaMetadata.search!.selectors!.tags!, ...allTagSelectors],
    },
  },

  userInfo: {
    ...SchemaMetadata.userInfo!,
    selectors: {
      ...SchemaMetadata.userInfo!.selectors!,
      bonus: {
        selector: ["td.rowhead:contains('鲸币') + td", "td.rowhead:contains('Karma Points') + td"],
        filters: [{ name: "parseNumber" }],
      },
    },
  },

  levelRequirements: [
    {
      id: 1,
      name: "Power User",
      interval: "P2W",
      downloaded: "120GB",
      ratio: 2.0,
      seedingBonus: 60000,
      privilege:
        "得到0个邀请名额；可以直接发布种子；可以查看NFO文档；可以查看用户列表；可以请求续种；" +
        '以查看排行榜；可以查看其它用户的种子历史(如果用户隐私等级未设置为"强")； 可以删除自己上传的字幕。',
    },
    {
      id: 2,
      name: "Elite User",
      interval: "P4W",
      downloaded: "256GB",
      ratio: 2.5,
      seedingBonus: 120000,
      privilege: "Elite User及以上用户封存账号后不会被删除。",
    },
    {
      id: 3,
      name: "Crazy User",
      interval: "P8W",
      downloaded: "512GB",
      ratio: 3.0,
      seedingBonus: 240000,
      privilege: "得到0个邀请名额；可以在做种/下载/发布的时候选择匿名模式。",
    },
    {
      id: 4,
      name: "Insane User",
      interval: "P12W",
      downloaded: "768GB",
      ratio: 3.5,
      seedingBonus: 360000,
      privilege: "无",
    },
    {
      id: 5,
      name: "Veteran User",
      interval: "P20W",
      downloaded: "1TB",
      ratio: 4.0,
      seedingBonus: 600000,
      privilege: "可以查看其它用户的评论、帖子历史。",
    },
    {
      id: 6,
      name: "Extreme User",
      interval: "P28W",
      downloaded: "2TB",
      ratio: 4.5,
      seedingBonus: 720000,
      privilege: "Extreme User及以上用户会永远保留账号。",
    },
    {
      id: 7,
      name: "Ultimate User",
      interval: "P40W",
      downloaded: "4TB",
      ratio: 5.0,
      seedingBonus: 1200000,
      privilege: "无",
    },
    {
      id: 8,
      name: "Nexus Master",
      interval: "P56W",
      downloaded: "8TB",
      ratio: 5.5,
      seedingBonus: 1680000,
      privilege: "无",
    },
  ],
};
