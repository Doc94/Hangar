<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
</script>

<template>
  <main>
    <Header />
    <div class="min-h-[60vh]">
      <Suspense>
        <router-view v-slot="{ Component }" v-bind="$attrs">
          <transition name="slide">
            <!-- dummy diff to make the transition work on pages where template root has multiple elements -->
            <div id="#page">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
        <template #fallback> Loading...</template>
      </Suspense>
    </div>
    <Footer />
  </main>
</template>
