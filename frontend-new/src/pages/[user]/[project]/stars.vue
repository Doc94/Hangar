<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useContext } from "vite-ssr/vue";
import { handleRequestError } from "~/composables/useErrorHandling";
import Card from "~/components/design/Card.vue";
import PageTitle from "~/components/design/PageTitle.vue";
import UserAvatar from "~/components/UserAvatar.vue";
import { avatarUrl } from "~/composables/useUrlHelper";
import Alert from "~/components/design/Alert.vue";
import { useStargazers } from "~/composables/useApiHelper";
import Link from "~/components/design/Link.vue";

const route = useRoute();
const i18n = useI18n();
const ctx = useContext();
const stargazers = await useStargazers(route.params.user as string, route.params.project as string).catch<any>((e) => handleRequestError(e, ctx, i18n));
</script>

<template>
  <Card>
    <template #header>
      <PageTitle>{{ i18n.t("project.stargazers") }}</PageTitle>
    </template>

    <div v-if="stargazers.result && stargazers.result.length > 0" class="flex flex-wrap gap-4">
      <div v-for="stargazer in stargazers.result" :key="stargazer.name">
        <UserAvatar size="xs" :username="stargazer.name" :avatar-url="avatarUrl(stargazer.name)" />
        <Link :to="'/' + stargazer.name">{{ stargazer.name }}</Link>
      </div>
    </div>
    <Alert v-else>
      {{ i18n.t("project.noStargazers") }}
    </Alert>
  </Card>
</template>
