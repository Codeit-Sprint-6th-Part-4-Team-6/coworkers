declare module "@coworkers-types" {
  export type TaskList = {
    groupId: number;
    displayIndex: number;
    updatedAt: ISODateString;
    createdAt: ISODateString;
    name: string;
    id: number;
    tasks: DateTask[];
  };

  export type TaskListInfo = Omit<TaskList, "tasks">;

  export type PatchTaskListOrder = {
    displayIndex: number;
  };
}
