export const signupformcontrols = [{
  name: 'name',
  type: 'text',
  id: 'name',
  label: 'Name',
  placeholder: 'Enter your name',
  componentType: 'input',
},
{
  name: 'email',
  type: 'email',
  id: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  componentType: 'input',
},
{
  name: 'password',
  type: 'password',
  id: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  componentType: 'input',
}]

export const signinformcontrols = [{
  name: 'email',
  type: 'email',
  id: 'email',
  label: 'Email',
  placeholder: 'Enter your email hooooo',
  componentType: 'input',
},
{
  name: 'password',
  type: 'password',
  id: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  componentType: 'input',
}]



export const scrumBoard = [{
  id: "todo",
  label: "To Do",
},
{
  id: "inprogress",
  label: "In Progress",
},
{
  id: "blocked",
  label: "Blocked",
},
{
  id: "review",
  label: "Review",
},
{
  id: "done",
  label: "Done",
}];

export const priorityBoard=[{
  id: "low",
  label: "Low",
},{
  id: "medium",
  label: "Medium",
},{
  id: "high",
  label: "High",
}];


export const addNewTaskFormControls = [{
  name: 'title',
  type: 'text',
  id: 'title',
  label: 'Title',
  placeholder: 'Enter your Title',
  componentType: 'input',
},
{
  name: 'description',
  type: 'text',
  id: 'description',
  label: 'Description',
  placeholder: 'Enter your Description',
  componentType: 'input',
},
{
  name: 'status',
  id: 'status',
  label: 'Status',
  placeholder: 'Enter your Status',
  componentType: 'select',
  options: scrumBoard,
},
{
  name: 'priority',
  id: 'priority',
  label: 'Priority',
  placeholder: 'Enter your Priority',
  componentType: 'select',
  options: [
    {
      id: 'low',
      label: 'Low',
    },
    {
      id: 'medium',
      label: 'Medium',
    },
    {
      id: 'high',
      label: 'High',
    },
  ],
},
{
  text:'Set Reminder',
  componentType: 'text',
},
{
  name: 'hours',
  id: 'hours',
  label: 'Hours',
  placeholder: 'Enter your Hours',
  componentType: 'input',
  type: 'number',
  min: '0',
},
{
  name: 'minutes',
  id: 'minutes',
  label: 'Minutes',
  placeholder: 'Enter your Minutes',
  componentType: 'input',
  type: 'number',
  min: '0',
  max: '59',
}
];

