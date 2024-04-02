const apiRoutes = {
  auth: {
    login: `http://localhost:3000/auth/login`,
    reffresh: `http://localhost:3000/auth/refresh`
  },
  patient: {
    base: `http://localhost:3000/patients`,
    patientById: `http://localhost:3000/patients?id=`,
  },
  user: {
    base: `http://localhost:3000/user`,
    userById: `http://localhost:3000/user?id=`,
  },
  appointments: {
    base: `http://localhost:3000/appointments`,
    appointmentsById: `http://localhost:3000/appointments?id=`,
    appointmentsResult: `http://localhost:3000/appointments/result?id=`,
  },
  reports: {
    base: `http://localhost:3000/reports`,
  }
};

export default apiRoutes;
