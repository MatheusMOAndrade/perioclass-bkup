import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import apiRoutes from "@/services/routes";
import Form from "@/templates/Patient/form";
import axios from "axios";

const PatientFormEdit = (props) => <Form {...props} />;

export default PatientFormEdit;

// export async function getServerSideProps({ params }) {
//   const token = window.sessionStorage.getItem("sessionToken");

//   try {
//     const data = await getPatientData(params.patientId);

//     return {
//       props: { patientData: data[0] }, // will be passed to the page component as props
//     };
//   } catch (err) {
//     return { notFound: true };
//   }
// }

// export const getPatientData = async (id: string) => {
//   const res = await axios.get(apiRoutes.patient.patientById + id, {
//     headers: { "session-token": token },
//   });

//   return res;
// };
