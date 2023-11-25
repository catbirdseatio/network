import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  body: yup
    .string()
    .min(5, "A post must have a minimum of 5 characters.")
    .max(127, "A post cannot exceed 127 characters.")
    .required("A body is required."),
});

const PostForm = ({ onSubmit, initialData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, ...formState },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const isEditMode = !!initialData;

  const onSubmitHandler = (data) => {
    onSubmit(data);
    // reset the form; assumes onSubmit was successful.
    if (!isEditMode) reset({body: ""})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Group className="mb-3">
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        <p className="text-danger my-3">{errors.body?.message}</p>
      </Form.Group>
      <Button variant={isEditMode ? "info" : "primary"} type="submit">
        {isEditMode ? "Update" : "Post"}
      </Button>
    </Form>
  );
};

export default PostForm;
