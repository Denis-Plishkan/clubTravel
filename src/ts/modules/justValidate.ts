import JustValidate from "just-validate";

export function justValidateRegistration() {
  const validateForm = document.querySelector("#registrationForm");

  if (validateForm) {
    const validate = new JustValidate("#registrationForm");

    validate
      .addField("#registrationMail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "customRegexp",
          value: /^[a-zA-Z0-9.-]+@[^\s@]+\.[\p{L}]{2,}$/u,
        },
      ])
      .addField("#registrationPassword", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 6,
        },
        {
          rule: "maxLength",
          value: 15,
        },
      ])
      .addField("#registrationRepeatPassword", [
        {
          rule: "required",
        },
        {
          rule: "minLength",
          value: 6,
        },
        {
          rule: "maxLength",
          value: 15,
        },
        {
          rule: "function",
          validator: (value: string, fields: any) => {
            if (
              fields["#registrationPassword"] &&
              fields["#registrationPassword"].elem
            ) {
              const repeatPasswordValue: string =
                fields["#registrationPassword"].elem.value;

              return value === repeatPasswordValue;
            }

            return true;
          },
          errorMessage: "Passwords should be the same",
        },
      ]);
  }
}

export function justValidateAuthorization() {
  const validateForm = document.querySelector("#authorizationForm");

  if (validateForm) {
    const validate = new JustValidate("#authorizationForm");

    validate
      .addField("#authorizationMail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "customRegexp",
          value: /^[a-zA-Z0-9.-]+@[^\s@]+\.[\p{L}]{2,}$/u,
        },
      ])
      .addField("#authorizationPassword", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 6,
        },
        {
          rule: "maxLength",
          value: 15,
        },
      ]);
  }
}

export function justValidatePasswordRecovery() {
  const validateForm = document.querySelector("#passwordRecoveryForm");

  if (validateForm) {
    const validate = new JustValidate("#passwordRecoveryForm");

    validate.addField("#passwordRecoveryMail", [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9.-]+@[^\s@]+\.[\p{L}]{2,}$/u,
      },
    ]);
  }
}

export function justValidateChangeName() {
  const validateForm = document.querySelector("#settingsForm");

  if (validateForm) {
    const validate = new JustValidate("#settingsForm");

    validate.addField("#changeName", [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "minLength",
        value: 2,
      },
      {
        rule: "maxLength",
        value: 20,
      },
    ]);

  }
}
