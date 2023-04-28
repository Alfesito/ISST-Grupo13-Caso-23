import React from "react";
import { shallow, mount } from "enzyme";
import SignIn from "./SignIn";

describe("SignIn", () => {
  it("renders without crashing", () => {
    shallow(<SignIn />);
  });

  it("calls handleVerify when register button is clicked", () => {
    const wrapper = mount(<SignIn />);
    const handleVerifySpy = jest.spyOn(wrapper.instance(), "handleVerify");
    wrapper.find('button[type="submit"]').simulate("click");
    expect(handleVerifySpy).toHaveBeenCalled();
  });

  it("shows error message when required fields are missing", () => {
    const wrapper = mount(<SignIn />);
    wrapper.find('button[type="submit"]').simulate("click");
    expect(wrapper.find(".swal2-title").text()).toEqual("Vaya...");
    expect(wrapper.find(".swal2-text").text()).toEqual("Campos obligatorios nulos");
  });

  it("shows error message when username and password are too short", () => {
    const wrapper = mount(<SignIn />);
    wrapper.find("#username").simulate("change", { target: { value: "user" } });
    wrapper.find("#password1").simulate("change", { target: { value: "pass" } });
    wrapper.find("#password2").simulate("change", { target: { value: "pass" } });
    wrapper.find('button[type="submit"]').simulate("click");
    expect(wrapper.find(".swal2-title").text()).toEqual("Vaya...");
    expect(wrapper.find(".swal2-text").text()).toEqual("Nombre de usuario y contraseña deben tener al menos 5 caracteres");
  });

  it("shows error message when email is invalid", () => {
    const wrapper = mount(<SignIn />);
    wrapper.find("#username").simulate("change", { target: { value: "username" } });
    wrapper.find("#email").simulate("change", { target: { value: "invalid_email" } });
    wrapper.find("#password1").simulate("change", { target: { value: "password" } });
    wrapper.find("#password2").simulate("change", { target: { value: "password" } });
    wrapper.find('button[type="submit"]').simulate("click");
    expect(wrapper.find(".swal2-title").text()).toEqual("Vaya...");
    expect(wrapper.find(".swal2-text").text()).toEqual("Correo electrónico inválido");
  });

});