import {
  DateTask,
  PatchTaskRequest,
  PatchTaskResponse,
  PostTaskRequest,
  Task,
  TaskDetails,
} from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 새로운 할 일을 생성하는 API 함수입니다.
 * @param groupId - 할 일이 포함된 그룹의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param data - 생성할 할 일 {name, description, displayIndex, frequencyType, monthDay}의 데이터입니다.
 * @returns 생성된 할 일 객체를 반환합니다.
 */
export const postTask = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  data: PostTaskRequest
): Promise<Task> => {
  const response = await axiosInstance.post<Task>(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    data
  );
  return response.data;
};

/**
 * 특정 일자와 특정 할 일 목록에 대한 할 일 리스트를 조회하는 API 함수입니다.
 * @param groupId - 할 일이 포함된 그룹의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param date - 조회할 날짜 (선택 사항, yyyy-mm-dd 형식).
 * @returns 특정 일자에 해당하는 할 일 배열을 반환합니다.
 */
export const getDateTaskList = async (
  groupId: number,
  taskListId: number,
  date?: string
): Promise<DateTask[]> => {
  const params = new URLSearchParams();
  if (date) {
    params.append("date", date);
  }

  const response = await axiosInstance.get<DateTask[]>(
    `groups/${groupId}/task-lists/${taskListId}/tasks?${params.toString()}`
  );
  return response.data;
};

/**
 * 할 일 상세보기를 조회하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 할 일을 받아올 task의 ID입니다.
 * @returns task의 상세정보 객체를 반환합니다.
 */
export const getTaskDetails = async (
  groupId: number,
  taskListId: number,
  taskId: number
): Promise<TaskDetails> => {
  const response = await axiosInstance.get<TaskDetails>(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

/**
 * 특정 할 일 완료 여부를 수정하는 API 함수입니다.
 * @param groupId - 할 일이 포함된 그룹의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 수정할 할 일의 ID입니다.
 * @param data - 수정할 내용의 데이터 { name, description, done } 입니다.
 * @returns 수정된 할 일의 상세 정보 객체를 반환합니다.
 */
export const patchTaskCompletionStatus = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  taskId: number,
  data: PatchTaskRequest
): Promise<PatchTaskResponse> => {
  const response = await axiosInstance.patch<PatchTaskResponse>(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data
  );
  return response.data;
};

/**
 * 특정 할 일을 한 번 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 삭제할 할 일의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteTask = async (
  taskId: string | string[] | undefined,
  groupId?: string | string[] | undefined,
  taskListId?: string | string[] | undefined
): Promise<void> => {
  await axiosInstance.delete(`groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);
};

/**
 * 반복 할 일을 모두 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 삭제할 할 일의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteRecurringTask = async (
  recurringId: string | string[] | undefined,
  groupId?: string | string[] | undefined,
  taskListId?: string | string[] | undefined,
  taskId?: string | string[] | undefined
): Promise<void> => {
  await axiosInstance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`
  );
};

/**
 * 할 일의 순서를 변경하는 API 함수입니다.
 * @param groupId - 순서를 변경할 할 일 목록이 포함된 그룹의 ID입니다.
 * @param taskListId - 순서를 변경할 할 일 목록의 ID입니다.
 * @param taskId - 순서를 변경할 할 일의 ID입니다.
 * @param displayIndex - 새로 설정할 순서의 인덱스입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const patchTaskOrder = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  taskId: string | string[] | undefined,
  displayIndex: number
): Promise<void> => {
  await axiosInstance.patch(`groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`, {
    displayIndex,
  });
};
