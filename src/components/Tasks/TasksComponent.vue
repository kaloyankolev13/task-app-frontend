<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="project in projects"
      :key="project.id"
      class="flex justify-between gap-x-6 py-5"
    >
      <div class="flex min-w-0 flex-1 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ project.name }}
          </p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">
            Due on {{ project.dueDate }}
          </p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">
            Created by {{ project.createdBy }}
          </p>
        </div>
        <div
          :class="{
            'bg-green-100 text-green-800': project.status === 'Complete',
            'bg-yellow-100 text-yellow-800': project.status === 'In progress',
            'bg-gray-100 text-gray-800': project.status === 'Archived',
          }"
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        >
          {{ project.status }}
        </div>
      </div>
      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <button
          type="button"
          class="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          View project
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    name: "GraphQL API",
    status: "Complete",
    dueDate: "March 17, 2023",
    createdBy: "Leslie Alexander",
  },
  {
    id: 2,
    name: "New benefits plan",
    status: "In progress",
    dueDate: "May 5, 2023",
    createdBy: "Leslie Alexander",
  },
  {
    id: 3,
    name: "Onboarding emails",
    status: "In progress",
    dueDate: "May 25, 2023",
    createdBy: "Courtney Henry",
  },
  {
    id: 4,
    name: "iOS app",
    status: "In progress",
    dueDate: "June 7, 2023",
    createdBy: "Leonard Krasner",
  },
  {
    id: 5,
    name: "Marketing site redesign",
    status: "Archived",
    dueDate: "June 10, 2023",
    createdBy: "Courtney Henry",
  },
];
</script>
