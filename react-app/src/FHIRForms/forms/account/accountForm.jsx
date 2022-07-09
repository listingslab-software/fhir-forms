export const accountForm = {
  title: `Account`,
  description: `Update your account and profile details`,
  path: `/personal-health/account`,
  icon: `account`,
  fields: [
      {
      mapKey: `name`,
      type: `InputString`,
      label: `Name`,
      required: true,
      autoFocus: true,
      helper: `Name is required.`,
    },
    {
      mapKey: `email`,
      type: `InputString`,
      label: `Email`,
      disabled: true,
      helperText: `To change your email, contact support`,
    },

    {
      mapKey: `dob`,
      type: `InputFullDateTime`,
      label: `Date of Birth`,
      valueType: `isoDate`,
      pickerOptions:{
        viewFormat: `MMMM DD YYYY`,
        showTime: false,
      },
    },
    {
      mapKey: `phone`,
      type: `InputString`,
      label: `Phone Number`,
      autoFocus: true,
    },
  ],
  dataShape: {
    name: `String`,
    email: `String`,
    dob: `IsoDate`,
    phone: `String`,
    address: `String`,
  },
}


