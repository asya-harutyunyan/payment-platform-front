import { TaskListComponent } from '@/components/organisms/task-list'
import { createFileRoute } from '@tanstack/react-router'

const TaskList = () => {
  return <TaskListComponent />
}

export const Route = createFileRoute('/_auth/_user/user-task-list/')({
  component: TaskList,
})
