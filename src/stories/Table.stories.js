import React from "react";

import Table from "../dm_page/Table";

export default {
  title: "DM/Table",
  component: Table,
};

const Template = (args) => (
  <div>
    <Table {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
