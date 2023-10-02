<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

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
                    <Tasks :tasks="completedTasks" :show="completedTaskIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import {storeToRefs} from "pinia"
    import {useTaskStore} from "../stores/task";
    import Tasks from "../components/tasks/Tasks.vue";
    import NewTask from "../components/tasks/NewTask.vue";

    const store = useTaskStore();
    const {completedTasks, uncompletedTasks} = storeToRefs(store);
    const { fetchAllTasks } = store

    onMounted( async () => {
        await fetchAllTasks()
    });

    const showToggleCompletedBtn = computed(
        () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
    );
    const completedTaskIsVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0);
    const showCompletedTasks = ref(false);

    

    
</script>
