const { validateAdopterData } = require("../validators/adopterValidator");

const valid = {
  name:     "João",
  surname:  "Silva",
  cpf:      "123.456.789-09",
  email:    "joao.silva@example.com",
  password: "strongPass1",
  phone:    "11987654321",
  birthday: "1990-01-15",
};


describe("validateAdopterData", () => {
  it("returns no errors for valid input", () => {
    const good = {
      name:     "João",
      surname:  "Silva",
      cpf:      "063.392.979-43",
      email:    "joao.silva@example.com",
      password: "Diegao10",
      phone:    "48922663355",
      birthday: "1990-01-15",
    };
    expect(validateAdopterData(good)).toEqual({});
  });

  it("flags missing name and surname", () => {
    const bad = { ...valid, name: null, surname: null };
    const errors = validateAdopterData(bad);
    expect(errors).toHaveProperty("name");
    expect(errors).toHaveProperty("surname");
  });

  it("rejects invalid CPF", () => {
    const bad = { ...valid, cpf: "1234" };
    const errors = validateAdopterData(bad);
    expect(errors.cpf).toMatch(/11 dígitos/);
  });

  it("rejects invalid email", () => {
    const bad = { ...valid, email: "not-an-email" };
    expect(validateAdopterData(bad).email).toBe("Email inválido.");
  });

  it("rejects short password", () => {
    expect(validateAdopterData({ ...valid, password: "123" }).password)
      .toMatch(/mínimo 8 caracteres/);
  });

  it("rejects invalid phone", () => {
    expect(validateAdopterData({ ...valid, phone: "abc" }).phone)
      .toMatch(/Telefone inválido/);
  });

  it("rejects invalid birthday", () => {
    expect(validateAdopterData({ ...valid, birthday: "not-a-date" }).birthday)
      .toMatch(/Data de nascimento inválida/);
  });
});
