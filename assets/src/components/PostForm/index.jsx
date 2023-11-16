import React from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PostForm = ({ onSubmit }) => {
    const {
        handleSubmit,
        reset,
        control,
        formState,
      } = useForm()
    
      React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({body: ""})
        }
      }, [formState, reset])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
