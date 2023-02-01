import React, { useState } from 'react';
import styled from 'styled-components';

interface Props { }

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid gray;
`;
const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid gray;
`;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const ContactForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handletext = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation des champs
    if (!formData.name) {
      setErrors({ ...errors, name: "Nom requis" });
    } else if (!formData.email) {
      setErrors({ ...errors, email: "Email requis" });
    } else if (!formData.message) {
      setErrors({ ...errors, message: "Message requis" });
    } else {
      // Appel d'une fonction pour envoyer les données au serveur ou autre traitement
      console.log("Formulaire soumis avec succès", formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Nom:
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <Error>{errors.name}</Error>}
      </Label>
      <Label>
        Email:
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Error>{errors.email}</Error>}
      </Label>
      <Label>
        Message:
        <textarea
          name="message"
          defaultValue={formData.message}
          onInput={handletext}
          placeholder="Votre message"
        />
        {errors.message && <Error>{errors.message}</Error>}
      </Label>
      <Input type="submit" value="Envoyer" />
    </Form>
  );
};


export default ContactForm;
