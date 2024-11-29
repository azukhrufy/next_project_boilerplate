import { createSWRHook } from "./_factory";
import userService from "@/services/userService";

export const useUser = createSWRHook({
  key: "use-user-by-id",
  fetcher: userService.getById,
});
export const useUsers = createSWRHook({
  key: "use-users",
  fetcher: userService.getList,
});
