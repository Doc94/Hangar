<script setup lang="ts">
import { computed, PropType } from "vue";
import { Project } from "hangar-api";
import { useI18n } from "vue-i18n";
import { forumUrl } from "~/composables/useUrlHelper";
import Card from "~/components/design/Card.vue";
import Link from "~/components/design/Link.vue";
import DropdownButton from "~/components/design/DropdownButton.vue";
import DropdownItem from "~/components/design/DropdownItem.vue";
import { hasPerms } from "~/composables/usePerm";
import { NamedPermission } from "~/types/enums";

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});
const i18n = useI18n();
const slug = computed(() => props.project.namespace.owner + "/" + props.project.name);
</script>

<template>
  <Card>
    <template #header>{{ i18n.t("project.info.title") }}</template>
    <template #default>
      <table class="w-full">
        <tbody>
          <tr>
            <th class="text-left">{{ i18n.t("project.category.info") }}</th>
            <td class="text-right">{{ i18n.t("project.category." + project.category) }}</td>
          </tr>
          <tr>
            <th class="text-left">{{ i18n.t("project.info.publishDate") }}</th>
            <td class="text-right">{{ i18n.d(project.createdAt) }}</td>
          </tr>
          <tr>
            <th class="text-left">{{ i18n.t("project.info.views", 0) }}</th>
            <td class="text-right">{{ project.stats.views }}</td>
          </tr>
          <tr>
            <th class="text-left">{{ i18n.t("project.info.totalDownloads", 0) }}</th>
            <td class="text-right">{{ project.stats.downloads }}</td>
          </tr>
          <tr>
            <th class="text-left">
              <Link :to="`/${slug}/stars`">
                {{ i18n.t("project.info.stars", 0) }}
              </Link>
            </th>
            <td class="text-right">{{ project.stats.stars }}</td>
          </tr>
          <tr>
            <th class="text-left">
              <Link :to="`/${slug}/watchers`">
                {{ i18n.t("project.info.watchers", 0) }}
              </Link>
            </th>
            <td class="text-right">{{ project.stats.watchers }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <DropdownButton v-if="hasPerms(NamedPermission.IS_STAFF)" :name="i18n.t('project.actions.adminActions')">
        <DropdownItem :to="`/${slug}/flags`">
          {{ i18n.t("project.actions.flagHistory" /* , [project.info.flagCount] */) }}
        </DropdownItem>
        <DropdownItem :to="`/${slug}/notes`">
          {{ i18n.t("project.actions.staffNotes" /* , [project.info.noteCount] */) }}
        </DropdownItem>
        <DropdownItem :to="`/admin/log/?projectFilter=/${slug}`">
          {{ i18n.t("project.actions.userActionLogs") }}
        </DropdownItem>
        <DropdownItem v-if="project.topicId" :href="forumUrl(project.topicId)">
          {{ i18n.t("project.actions.forum") }}
        </DropdownItem>
      </DropdownButton>
    </template>
  </Card>
</template>
