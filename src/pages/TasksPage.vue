<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    

                    <!-- list of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" 
                            @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed</span>
                            <span v-else>Hide Completed</span>
                        </button>
                    </div>

                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" v-show="completedTaskIsVisible && showCompletedTasks" />
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
    const showToggleCompletedBtn = computed(
        () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
    );
    const completedTaskIsVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0);
    const showCompletedTasks = ref(false);

</script>
