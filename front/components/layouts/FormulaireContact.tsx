import React, { useState } from 'react';

interface Props {}

const ContactForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({
      name: formData.name ? "" : "Name is required.",
      email: formData.email ? "" : "Email is required.",
      message: formData.message ? "" : "Message is required.",
    });
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      // Send a request to your server to save the form data
      console.log(formData);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <br />
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
        />
        {errors.message && <span>{errors.message}</span>}
      </label>
      <br />
      <input type="submit" value="Envoyer" disabled={isSubmitting} />
    </form>
  );
}

export default ContactForm;
