<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import IconMdiMenuDown from "~icons/mdi/menu-down";
import IconMdiMenuUp from "~icons/mdi/menu-up";

const props = withDefaults(
  defineProps<{
    name?: string;
  }>(),
  {
    name: "Dropdown",
  }
);
</script>

<template>
  <Menu v-slot="{ open }">
    <MenuButton class="px-4 py-2 rounded bg-primary-100 text-white font-semibold inline-flex items-center">
      <span class="mx-1">{{ props.name }}</span>
      <IconMdiMenuUp v-if="open" class="text-lg"></IconMdiMenuUp>
      <IconMdiMenuDown v-else class="text-lg"></IconMdiMenuDown>
    </MenuButton>
    <MenuItems class="absolute flex flex-col mt-1 z-10 py-1 rounded border-t-2 border-primary-100 bg-background-light-0 dark:bg-background-dark-80 shadow-soft">
      <slot></slot>
    </MenuItems>
  </Menu>
</template>
