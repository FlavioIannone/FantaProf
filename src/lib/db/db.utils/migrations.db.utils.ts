import { FieldPath } from "firebase-admin/firestore";
import { admin_firestore } from "../firebase-connection.server";
import { Class, StudentEnrollment } from "../schema.db";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "./members.db.utils";

// export const migrateStudentPoints = async () => {
//   const classesSnap = await admin_firestore.collection(Class.collection).get();

//   for (const classDoc of classesSnap.docs) {
//     const classId = classDoc.id;

//     // Prendi tutti gli studenti
//     const studentsSnap = await admin_firestore
//       .collection(Class.collection)
//       .doc(classId)
//       .collection(StudentEnrollment.collection)
//       .get();

//     for (const studentDoc of studentsSnap.docs) {
//       const studentData = StudentEnrollment.schema.parse(studentDoc.data());
//       const points = await calculatePointsBasedOnTeachersInTeamInFirestore(
//         studentData.uid,
//         classId
//       );

//       await studentDoc.ref.update({ points: points ?? 0 });
//     }
//   }
// };

// export const migrateAdminCount = async () => {
//   const classesSnap = await admin_firestore.collection(Class.collection).get();

//   for (const classDoc of classesSnap.docs) {
//     const classId = classDoc.id;

//     const adminsSnap = await classDoc.ref
//       .collection(StudentEnrollment.collection)
//       .where("admin", "==", true)
//       .count()
//       .get();
//     const count = adminsSnap.data().count;
//     classDoc.ref.update({
//       admin_count: count,
//     });
//   }
// };
