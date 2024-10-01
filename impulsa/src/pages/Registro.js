import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h1>Registro</h1>
      <form>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
