import { ClassesTableRowType, MembersTableRowType, TeacherTableRowType, FilteredClassData, FilteredStudentEnrollmentData } from "@/lib/data/types.data-layer";


// ─────────────────────────────────────────────────────────────────────────────
// 🔁 Shared helper to handle authenticated fetch requests with error handling
/**
 * @deprecated
 * Fetches an url using the fetch API and including the Authorization header.
 * @param url url to fetch
 * @param token user token, for authorization
 * @returns The T generic type passed, undefined if T is not given
 */
async function fetchWithAuth<T>(url: string, token: string): Promise<T> {
  try {
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
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch ${url}`);


  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 📚 Fetch list of all classes the user is enrolled in
/**
 * @deprecated
 * 
 * @param token 
 * @returns 
 */
export const getClasses = async (token: string): Promise<ClassesTableRowType[]> => await fetchWithAuth<ClassesTableRowType[]>(
  "/api/protected/classes",
  token,

);
/**
 * 
 * @deprecated
 * @param token 
 * @returns 
 */
// 🧠 Fetch global stats for the user (best score & class count)
export const getGlobalStats = async (token: string): Promise<{
  bestScore: { points: number; className: string };
  enrollmentCount: number;
}> => fetchWithAuth("/api/protected/users/global-stats", token,);

/**
 * 
 * @deprecated
 * @param token 
 * @returns 
 */
// 👥 Fetch members of a specific class
export const getClassMembers = async (
  token: string,
  class_id: string
): Promise<MembersTableRowType[]> => await fetchWithAuth<MembersTableRowType[]>(
  `/api/protected/classes/${class_id}/members`,
  token,
);

/**
 * 
 * @deprecated
 * @param token 
 * @returns 
 */
// 📊 Fetch class metadata (total members and teachers)
export const getClassData = async (
  token: string,
  class_id: string
): Promise<FilteredClassData> => fetchWithAuth(`/api/protected/classes/${class_id}`, token,);


/**
 * 
 * @deprecated
 * @param token 
 * @returns 
 */
// 🏅 Fetch class performance stats (total credits and points)
export const getStudentEnrollmentData = (
  token: string,
  class_id: string
): Promise<FilteredStudentEnrollmentData> => fetchWithAuth<FilteredStudentEnrollmentData>(`/api/protected/classes/${class_id}/get-student-data`, token,);

/**
 * 
 * @deprecated
 * @param token 
 * @returns 
 */
// Fetch class teachers
export const getClassTeachers = async (token: string, class_id: string) =>
  await fetchWithAuth<TeacherTableRowType[]>(`/api/protected/classes/${class_id}/teachers`, token,);