<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { definedLangMetaData } from "@/options/plugins/i18n.ts";

import { REPO_URL } from "~/helper.ts";

const { rt, tm, t } = useI18n();

const sortedPeople = [
  "Rhilip (R酱)",
  "ted423",
  "luckiestone",
  "sabersalv",
  "bimzcy (白鸽男孩)",
  "DXV5 (贝壳)",
  "An",
  "Abel袁",
  "Мало",
  "tongyifan (杯杯杯杯具)",
  "the chosen one (三哥)",
  "橙子",
  "frank777777777 (杀死那个异教徒)",
].sort();
</script>

<template>
  <v-alert border="start" border-color="deep-purple-accent-4" class="mb-2" elevation="2">
    <template v-for="i in tm('SpecialThank.thankNote')" :key="i"> {{ rt(i) }} <br /> </template>
    {{ t("SpecialThank.contributor") }}:
    <a :href="`${REPO_URL}/graphs/contributors`" rel="noopener noreferrer nofollow" target="_blank">
      {{ REPO_URL }}/graphs/contributors
    </a>
    <br />
    {{ t("SpecialThank.issue") }}:
    <a :href="`${REPO_URL}/issues`" rel="noopener noreferrer nofollow" target="_blank">{{ REPO_URL }}/issues</a>
  </v-alert>

  <v-card class="mb-2">
    <v-card-title>{{ t("SpecialThank.langContributor") }}</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th>Code</th>
          <th>{{ t("common.language") }}</th>
          <th>{{ t("SpecialThank.contributor") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(langMeta, index) in definedLangMetaData" :key="index">
          <td>{{ langMeta.value }}</td>
          <td>{{ langMeta.title }}</td>
          <td>{{ langMeta.authors.join(", ") }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card class="mb-2">
    <v-card-title>{{ t("SpecialThank.preWorkContributor") }} ({{ t("SpecialThank.sortByName") }})</v-card-title>

    <v-table>
      <tbody>
        <tr v-for="(people, index) in sortedPeople" :key="index">
          <td>
            <v-avatar><v-icon icon="mdi-account-circle" /></v-avatar>
            {{ people }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<style scoped></style>
