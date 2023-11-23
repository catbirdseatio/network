import React from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PostForm = ({ onSubmit, initialData }) => {
  const { handleSubmit, reset, control, formState } = useForm({
    defaultValues: initialData,
  });

  const isEditMode = !!initialData;

  React.useEffect(() => {
    if (!isEditMode && formState.isSubmitSuccessful) {
      reset({ body: "" });
    }
  }, [formState, reset]);

  const onSubmitHandler = data => onSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Group className="mb-3">
        <Form.Label>Body</Form.Label>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
      </Form.Group>
      <Button variant={isEditMode ? 'info' : 'primary'} type="submit">
      {isEditMode ? 'Update' : 'Post'}
      </Button>
    </Form>
  );
};

export default PostForm;
