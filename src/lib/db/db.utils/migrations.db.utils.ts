import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { admin_firestore } from "../firebase-connection.server";
import {
  Class,
  StudentEnrollment,
  Teacher,
  TeamEnrollment,
} from "../schema.db";
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

// export const migrateTeamCaptainRef = async () => {
//   const classesSnap = await admin_firestore.collection(Class.collection).get();

//   const batch = admin_firestore.batch();
//   for (const classDoc of classesSnap.docs) {
//     const classId = classDoc.id;
//     const studentEnrollmentsSnap = await classDoc.ref
//       .collection(StudentEnrollment.collection)
//       .get();
//     for (const studentEnrollmentDoc of studentEnrollmentsSnap.docs) {
//       const captain = await studentEnrollmentDoc.ref
//         .collection(TeamEnrollment.collection)
//         .where("captain", "==", true)
//         .limit(1)
//         .get();
//       if (captain.empty) continue;
//       const captain_id = captain.docs[0].id;
//       batch.update(studentEnrollmentDoc.ref, {
//         team_captain_id: captain_id,
//       });
//     }
//   }
//   await batch.commit();
// };

// export const migrateTeamEnrollmentPointsAndPrice = async () => {
//   const classesSnap = await admin_firestore.collection(Class.collection).get();

//   const batch = admin_firestore.batch();
//   for (const classDoc of classesSnap.docs) {
//     const classId = classDoc.id;
//     const studentEnrollmentsSnap = await classDoc.ref
//       .collection(StudentEnrollment.collection)
//       .get();
//     for (const studentEnrollmentDoc of studentEnrollmentsSnap.docs) {
//       const teamEnrollmentsSnap = await studentEnrollmentDoc.ref
//         .collection(TeamEnrollment.collection)
//         .get();
//       for (const teamEnrollmentDoc of teamEnrollmentsSnap.docs) {
//         const teacher_id = teamEnrollmentDoc.id;
//         const teacherDocSnap = await classDoc.ref
//           .collection(Teacher.collection)
//           .doc(teacher_id)
//           .get();
//         const teacherData = Teacher.schema.parse(teacherDocSnap.data());
//         batch.update(teamEnrollmentDoc.ref, {
//           points: teacherData.points,
//           price: teacherData.price,
//         });
//       }
//     }
//   }
//   await batch.commit();
// };
