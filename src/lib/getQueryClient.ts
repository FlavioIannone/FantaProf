import { isServer, QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  classes: "classes",
  members: "members",
  globalStats: "globalStats",
  studentEnrollment: "studentEnrollment",
  classData: "classData",
  classTeachers: "classTeachers"
};


export const invalidateEveryQuery = async (queryClient: QueryClient) => {
  await Promise.all(Object.values(queryKeys).map((queryKey) =>
    queryClient.invalidateQueries({ queryKey: [queryKey], exact: false })
  ))
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // after 1 minute
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
