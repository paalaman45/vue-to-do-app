<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask"/>

                    <!-- list of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" 
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @removed="handleRemovedTask"
                    />

                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" 
                            @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed</span>
                            <span v-else>Hide Completed</span>
                        </button>
                    </div>

                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" 
                        v-show="completedTaskIsVisible && showCompletedTasks" 
                        @updated="handleUpdatedTask"
                        @completed="handleCompletedTask"
                        @removed="handleRemovedTask"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/task-api";
    import Tasks from "../components/tasks/Tasks.vue";
    import NewTask from "../components/tasks/NewTask.vue";

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

    const handleAddedTask = async(newTask) => {
        const { data: createdTask } = await createTask(newTask);
        tasks.value.unshift(createdTask.data);
    }

    const handleUpdatedTask = async(task) => {
        const { data: updatedTask } = await updateTask(task.id, {
            name: task.name
        })

        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.name = updatedTask.data.name
    }

    const handleCompletedTask = async (task) => {
        const { data: updatedTask } = await completeTask(task.id, {
            is_completed: task.is_completed
        })
        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.is_completed = updatedTask.data.is_completed
    }

    const handleRemovedTask = async (task) => {
        await removeTask(task.id)
        const index = tasks.value.findIndex(item => item.id === task.id)
        tasks.value.splice(index, 1)
    }
</script>
