export type ClassesTableRow = {
  class_name: string;
  members: number;
  credits: number;
  points: number;
  id: string;
};

export async function getClasses(token: string) {
  const rowsReq = await fetch("/api/protected/classes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (rowsReq.status !== 200) {
    throw new Error();
  }
  const rows = (await rowsReq.json()).classes as Array<ClassesTableRow>;
  return rows;
}

export async function getGlobalStats(token: string) {
  const statsReq = await fetch("/api/protected/users/global-stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (statsReq.status !== 200) {
    throw new Error();
  }
  const stats = (await statsReq.json()) as {
    bestScore: { points: number; className: string };
    enrollmentCount: number;
  };

  if (stats.bestScore.points === -1 || stats.enrollmentCount === -1) {
    throw new Error();
  }
  return stats;
}
