<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div class="relative">
                        <input type="text" class="form-control form-control-lg padding-right-lg"
                            placeholder="+ Add new task. Press enter to save." />
                    </div>

                    <!-- list of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- show toggle button -->


                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { allTasks } from "../http/task-api";
    import Tasks from "../components/tasks/Tasks.vue";

    const tasks = ref([]);

    onMounted( async () => {
        const { data } = await allTasks()
        tasks.value = data.data
    });

    const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed));
    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed));
</script>
