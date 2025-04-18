import axios from "axios";
import type { IFetchSocialSiteInformationConfig, ISocialInformation } from "./types.ts";

import { log } from "~/helper.ts";

export * from "./types.ts";

export const buildInPtGenApi = [
  "https://ourbits.github.io/PtGen/<site>/<sid>.json",
  "https://pt-gen.netlify.app/<site>/<sid>.json",
  "https://cdn.ourhelp.club/ptgen/<site>/<sid>.json",
  "https://api.ourhelp.club/infogen?site=<site>&sid=<sid>",
];

interface socialEntity {
  parse: (query: string) => string;
  build: (id: string) => string;
  fetchInformation: (id: string, config: IFetchSocialSiteInformationConfig) => Promise<ISocialInformation>;
  transformPtGen?: (data: any) => ISocialInformation;
}

export const socialContent = import.meta.glob<socialEntity>("./entity/*.ts", { eager: true });
export const socialEntityList = Object.keys(socialContent).map((value: string) => {
  return value.replace(/^\.\/entity\//, "").replace(/\.ts$/, "");
}) as string[];

export type TSupportSocialSite = (typeof socialEntityList)[number];

const PtGenApiSupportSite: TSupportSocialSite[] = [] as const;
export const socialBuildUrlMap: Record<TSupportSocialSite, socialEntity["build"]> = {};
export const socialParseUrlMap: Record<TSupportSocialSite, socialEntity["parse"]> = {};

export function getSocialModule(site: TSupportSocialSite): socialEntity {
  return socialContent[`./entity/${site}.ts`];
}

for (const socialEntity of socialEntityList) {
  const socialModule = getSocialModule(socialEntity);
  socialBuildUrlMap[socialEntity] = socialModule.build;
  socialParseUrlMap[socialEntity] = socialModule.parse;

  if (socialModule.transformPtGen) {
    PtGenApiSupportSite.push(socialEntity);
  }
}

export async function getSocialSiteInformation(
  site: TSupportSocialSite,
  id: string,
  config: IFetchSocialSiteInformationConfig = {},
  // @ts-ignore
): Promise<ISocialInformation | undefined> {
  const socialModule = getSocialModule(site);
  const { usePtGen = true, ptGenEndpoint = buildInPtGenApi[0], timeout = 5e3 } = config;

  if (usePtGen && PtGenApiSupportSite.includes(site)) {
    log("Use PtGen API to fetch social site information ", { site, id });

    for (const ptGenEndpointElement of new Set<string>([ptGenEndpoint, ...buildInPtGenApi])) {
      const ptGenUrl = ptGenEndpointElement.replace("<site>", site).replace("<sid>", id);
      try {
        const req = await axios.get(ptGenUrl, { timeout, responseType: "json" });
        if (req.status === 200) {
          const data = req.data as any;
          if (data.success !== false) {
            return socialModule.transformPtGen!(data);
          }
        }
      } catch (error) {}
    }
  } else {
    log("Use build-in API to fetch social site information:", { site, id });
    return await socialModule.fetchInformation(id, config);
  }
}
