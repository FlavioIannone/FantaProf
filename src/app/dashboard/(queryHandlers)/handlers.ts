export type ClassesTableRow = {
  class_name: string;
  members: number;
  credits: number;
  points: number;
  class_id: string;
  admin: boolean;
};

export type MembersTableRow = {
  display_name: string;
  credits: number;
  points: number;
  admin: boolean;
  photo_URL: string;
};

export async function getClasses(token: string) {
  const rowsRes = await fetch("/api/protected/classes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (rowsRes.status !== 200) {
    throw new Error();
  }
  const rows = (await rowsRes.json()).classes as Array<ClassesTableRow>;
  return rows;
}

export async function getGlobalStats(token: string) {
  const statsRes = await fetch("/api/protected/users/global-stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (statsRes.status !== 200) {
    throw new Error();
  }
  const stats = (await statsRes.json()) as {
    bestScore: { points: number; className: string };
    enrollmentCount: number;
  };

  if (stats.bestScore.points === -1 || stats.enrollmentCount === -1) {
    throw new Error();
  }
  return stats;
}

export async function getClassMembers(
  token: string,
  class_id: string
): Promise<MembersTableRow[]> {
  const membersRes = await fetch(`/api/protected/classes/${class_id}/members`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (membersRes.status !== 200) {
    throw new Error();
  }
  const data = (await membersRes.json()).members as MembersTableRow[];

  return data;
}
