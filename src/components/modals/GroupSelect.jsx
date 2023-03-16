import { useGetCategoriesQuery } from "redux/slices/postSlice";

import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { Grid } from "@mui/material";

export default function GroupedSelect({ category, setCategory, setPage }) {
  const { data: categories } = useGetCategoriesQuery();

  const handleChanges = (e, func) => {
    setCategory(e.target.value);
    func("form");
    setPage(1);
  };
  const categorys = categories.map((item) => ({
    value: item.slug,
    label: item.name,
  }));

  return (
    <Grid item container>
      <Formik initialValues={{ form: "" }} on>
        {({ handleChange }) => {
          return (
            <Form>
              <Grid item container>
                <FormikControl
                  name="form"
                  control={"select"}
                  value={category}
                  onChange={(e) => handleChanges(e, handleChange)}
                  options={[
                    {
                      value: "",
                      label: "All Categories",
                    },
                    ...categorys,
                  ]}
                  placeholder="Categories"
                />
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}
