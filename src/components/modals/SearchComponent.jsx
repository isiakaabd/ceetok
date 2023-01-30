import { SearchOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";

const SearchComponent = ({ placeholder, handleSubmit }) => {
  return (
    <Grid item container>
      <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
        <Form style={{ width: "100%" }}>
          <FormikControl
            control="inputs"
            name="name"
            placeholder={placeholder ? placeholder : "Search..."}
            Icon={SearchOutlined}
            order={1}
            buttonStyle={{
              background: "#37D42A",
              color: "#fff",
            }}
          />
        </Form>
      </Formik>
    </Grid>
  );
};

export default SearchComponent;
