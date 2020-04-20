import React from "react";
import { shallow } from "enzyme";
import login from "../components/authentication/login";

const wrapper = shallow(<login />);

describe("Sample components tests", () => {
  it("Should Render login Component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
