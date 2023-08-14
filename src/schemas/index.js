import * as Yup from "yup";

export const tournamentSchema = Yup.object({
  tournamentName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your tournament name"),
  startDate: Yup.date().required("Please enter the start date"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before start date")
    .required("Please enter the end date"),
  banner: Yup.string().required("Banner url is required"),
  description: Yup.string().required("Description is required"),
});

export const participantSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email address"),
  location: Yup.string().required("Location is required"),
});
