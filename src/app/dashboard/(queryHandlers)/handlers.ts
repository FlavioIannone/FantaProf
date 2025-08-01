// TYPES
export type ClassesTableRow = {
  class_name: string;
  members: number;
  credits: number;
  points: number;
  class_id: string;
  admin: boolean;
};

export type MembersTableRowType = {
  display_name: string;
  credits: number;
  points: number;
  admin: boolean;
  photo_URL: string;
  email: string
  uid: string
};

export type FilteredClassData = {
  members: number;
  teachers: number;
};

export type FilteredClassStats = {
  credits: number;
  points: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// 🔁 Shared helper to handle authenticated fetch requests with error handling
async function fetchWithAuth<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    // Special case: empty but valid response
    return [] as T;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return await res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// 📚 Fetch list of all classes the user is enrolled in
export async function getClasses(token: string): Promise<ClassesTableRow[]> {
  const data = await fetchWithAuth<{ classes: ClassesTableRow[] }>(
    "/api/protected/classes",
    token
  );
  return data.classes;
}

// 🧠 Fetch global stats for the user (best score & class count)
export async function getGlobalStats(token: string): Promise<{
  bestScore: { points: number; className: string };
  enrollmentCount: number;
}> {
  return fetchWithAuth("/api/protected/users/global-stats", token);
}

// 👥 Fetch members of a specific class
export async function getClassMembers(
  token: string,
  class_id: string
): Promise<MembersTableRowType[]> {
  const data = await fetchWithAuth<{ members: MembersTableRowType[] }>(
    `/api/protected/classes/${class_id}/members`,
    token
  );
  return data.members;
}

// 📊 Fetch class metadata (total members and teachers)
export async function getClassData(
  token: string,
  class_id: string
): Promise<FilteredClassData> {
  return fetchWithAuth(`/api/protected/classes/${class_id}`, token);
}

// 🏅 Fetch class performance stats (total credits and points)
export async function getClassStats(
  token: string,
  class_id: string
): Promise<FilteredClassStats> {
  return fetchWithAuth(`/api/protected/classes/${class_id}/stats`, token);
}
